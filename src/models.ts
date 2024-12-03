export interface Note {
  duration: number; // 1 = quaver
  isRest: boolean;
  isAccent: boolean;
}

export interface Bar {
  beat: number;
  subdivision: number;
  notes: Note[];
}

export interface BarGroup {
  bars: (Bar | BarGroup)[];
  repeat: number;
}

export interface MetronomeSetting {
  name: string;
  unit: number; // 1=quaver, 2=crotchet, 3=dotted crotchet, 4=minim
  bpm: number; // beats per minute
  bars: (Bar | BarGroup)[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNote(obj: any): obj is Note {
  if(obj === null || typeof obj !== 'object') {
    return false;
  }
  if(
    !obj.hasOwnProperty('duration')
    || !obj.hasOwnProperty('isRest')
    || !obj.hasOwnProperty('isAccent')
  ) {
    return false;
  }
  if(
    typeof obj.duration !== 'number'
    || typeof obj.isRest !== 'boolean'
    || typeof obj.isAccent !== 'boolean'
  ) {
    return false;
  }

  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBar(obj: any): obj is Bar {
  if(obj === null || typeof obj !== 'object') {
    return false;
  }
  if(
    !obj.hasOwnProperty('beat')
    || !obj.hasOwnProperty('subdivision')
    || !obj.hasOwnProperty('notes')
  ) {
    return false;
  }
  if(
    typeof obj.beat !== 'number'
    || typeof obj.subdivision !== 'number'
    || !Array.isArray(obj.notes)
  ) {
    return false;
  }
  const len = obj.notes.length;
  for(let i=0; i<len; i++) {
    if(!isNote(obj.notes[i])) {
      return false;
    }
  }

  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBarGroup(obj: any): obj is BarGroup {
  if(obj === null || typeof obj !== 'object') {
    return false;
  }
  if(
    !obj.hasOwnProperty('bars')
    || !obj.hasOwnProperty('repeat')
  ) {
    return false;
  }
  if(
    typeof obj.repeat !== 'number'
    || !Array.isArray(obj.bars)
  ) {
    return false;
  }
  const len = obj.bars.length;
  if(len<=0) {
    return false;
  }
  for(let i=0; i<len; i++) {
    if(!isBar(obj.bars[i]) && !isBarGroup(obj.bars[i])) {
      return false;
    }
  }

  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMetronomeSetting(obj: any): obj is MetronomeSetting {
  if(obj === null || typeof obj !== 'object') {
    return false;
  }
  if(
    !obj.hasOwnProperty('bars')
    || !obj.hasOwnProperty('name')
    || !obj.hasOwnProperty('unit')
    || !obj.hasOwnProperty('bpm')
  ) {
    return false;
  }
  if(
    typeof obj.name !== 'string'
    || typeof obj.unit !== 'number'
    || typeof obj.bpm !== 'number'
    || !Array.isArray(obj.bars)
  ) {
    return false;
  }
  const len = obj.bars.length;
  for(let i=0; i<len; i++) {
    if(!isBar(obj.bars[i]) && !isBarGroup(obj.bars[i])) {
      return false;
    }
  }

  return true;
}
