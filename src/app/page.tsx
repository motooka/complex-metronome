'use client';

// import styles from "./page.module.css";
// import Link from "next/link";
import React from 'react';
import {
  MetronomeSetting,
} from '@/models';
import {buildAudio} from "@/app/audio";

const DefAULT_METRONOME: MetronomeSetting = {
  name: 'for Armenian Dances part 1',
  unit: 2,
  bpm: 120,
  bars: [
    {
      beat: 5,
      subdivision: 8,
      notes: [
        {quaverCount: 1, isAccent: true, isRest: false},
        {quaverCount: 1, isAccent: false, isRest: false},
        {quaverCount: 1, isAccent: true, isRest: false},
        {quaverCount: 1, isAccent: false, isRest: false},
        {quaverCount: 1, isAccent: false, isRest: false},
      ],
    },
    {
      beat: 5,
      subdivision: 8,
      notes: [
        {quaverCount: 1, isAccent: true, isRest: false},
        {quaverCount: 1, isAccent: false, isRest: false},
        {quaverCount: 1, isAccent: false, isRest: false},
        {quaverCount: 1, isAccent: true, isRest: false},
        {quaverCount: 1, isAccent: false, isRest: false},
      ],
    },
  ],
}

let audioContext: AudioContext | null = null;

export default function Home() {
  const [metronome, ] = React.useState<MetronomeSetting>(DefAULT_METRONOME);
  const [playing, setPlaying] = React.useState<boolean>(false);
  React.useEffect(() => {
  }, []);

  async function start() {
    setPlaying(true);
    const audioBuffer = await buildAudio(metronome);
    audioContext = new AudioContext();
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.loop = true;
    sourceNode.start();
  }
  async function stop() {
    setPlaying(false);
    if(audioContext) {
      await audioContext.close();
    }
    audioContext = null;
  }

  const metronomeStr = JSON.stringify(metronome, null, 2);
  return (
    <>
      <h2>setting</h2>
      <pre>{metronomeStr}</pre>
      <h2>Player</h2>
      {
        playing ? (<button onClick={stop}>stop</button>) : (<button onClick={start}>start</button>)
      }
    </>
  );
}
