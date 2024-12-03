'use client';

import styles from "./page.module.css";
import Link from "next/link";
import React from 'react';
import {
  Bar, Note, BarGroup, MetronomeSetting,
} from '@/models';

const DefAULT_METRONOME: MetronomeSetting = {
  name: 'for Armenian Dances part 1',
  unit: 1,
  bpm: 120,
  bars: [
    {
      beat: 5,
      subdivision: 8,
      notes: [
        {duration: 1, isAccent: true, isRest: false},
        {duration: 1, isAccent: false, isRest: false},
        {duration: 1, isAccent: true, isRest: false},
        {duration: 1, isAccent: false, isRest: false},
        {duration: 1, isAccent: false, isRest: false},
      ],
    },
    {
      beat: 5,
      subdivision: 8,
      notes: [
        {duration: 1, isAccent: true, isRest: false},
        {duration: 1, isAccent: false, isRest: false},
        {duration: 1, isAccent: false, isRest: false},
        {duration: 1, isAccent: true, isRest: false},
        {duration: 1, isAccent: false, isRest: false},
      ],
    },
  ],
}


export default function Home() {
  const [metronome, ] = React.useState<MetronomeSetting>(DefAULT_METRONOME);
  const [playing, setPlaying] = React.useState<boolean>(false);
  React.useEffect(() => {
  }, []);

  function start() {
    setPlaying(true);
  }
  function stop() {
    setPlaying(false);
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
