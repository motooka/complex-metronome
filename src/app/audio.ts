import {Bar, BarGroup, isBarGroup, MetronomeSetting} from "@/models";

const CLICK_LENGTH_SECONDS = 0.1;
const CLICK_FREQ_NORMAL = 220;
const CLICK_FREQ_ACCENT = 440;

function calcCrotchetsPerSecond(unit: number, bpm: number): number {
  return (bpm / 60.0) / (unit / 2.0);
}
function calcSecondsPerCrotchet(unit: number, bpm: number): number {
  return (unit / 2.0) / (bpm / 60.0);
}

function secondsPerBar(unit: number, bpm: number, bar: Bar | BarGroup): number {
  let result = 0.0;
  if(isBarGroup(bar)) {
    for(const b of bar.bars) {
      result += secondsPerBar(unit, bpm, b);
    }
  }
  else {
    const crotchetsPerSecond = calcCrotchetsPerSecond(unit, bpm);
    const crotchetsPerBar = (4.0 / bar.subdivision) * bar.beat;
    result = crotchetsPerBar / crotchetsPerSecond;
  }
  return result;
}

function secondsPerBars(unit: number, bpm: number, bars: (Bar | BarGroup)[]): number {
  let result = 0.0;
  for(const b of bars) {
    result += secondsPerBar(unit, bpm, b);
  }
  return result;
}

function renderBar(context: BaseAudioContext, unit: number, bpm: number, bar: Bar | BarGroup, time: number): number {
  if(isBarGroup(bar)) {
    for(const b of bar.bars) {
      time = renderBar(context, unit, bpm, b, time);
    }
    return time;
  }

  const secondsPerCrotchet = calcSecondsPerCrotchet(unit, bpm);
  for(const note of bar.notes) {
    const noteSeconds = (note.quaverCount / 2.0) * secondsPerCrotchet;
    if(note.isRest) {
      const osci = context.createOscillator();
      osci.frequency.value = 0;
      osci.connect(context.destination);
      osci.start(time);
      osci.stop(time + noteSeconds);
      time += noteSeconds;
      continue;
    }

    const soundDuration = Math.min(CLICK_LENGTH_SECONDS, noteSeconds);
    const restDuration = noteSeconds - soundDuration;

    const osci1 = context.createOscillator();
    osci1.frequency.value = note.isAccent ? CLICK_FREQ_ACCENT : CLICK_FREQ_NORMAL;
    osci1.connect(context.destination);
    osci1.start(time);
    osci1.stop(time + soundDuration);

    if(restDuration > 0.0) {
      const osci2 = context.createOscillator();
      osci2.frequency.value = 0;
      osci2.connect(context.destination);
      osci2.start(time + soundDuration);
      osci2.stop(time + noteSeconds);
    }

    time += noteSeconds;
  }

  return time;
}

export async function buildAudio(metronome: MetronomeSetting): Promise<AudioBuffer> {
  const duration = secondsPerBars(metronome.unit, metronome.bpm, metronome.bars);
  const rate = 44100;

  const context = new OfflineAudioContext({
    numberOfChannels: 1,
    length: rate * duration,
    sampleRate: rate,
  });

  let time = context.currentTime;
  for(const bar of metronome.bars) {
    time = renderBar(context, metronome.unit, metronome.bpm, bar, time);
  }

  return await context.startRendering();
}
