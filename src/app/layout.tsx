import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import styles from "@/app/page.module.css";

import {buildInfo} from "@/buildInfo";

export const metadata: Metadata = {
  title: 'Complex Metronome',
  description: '',
  other: {
    'twitter:card': 'summary',
    'twitter:title': 'Complex Metronome',
    'twitter:description': 'A web-based metronome which supports complex time signatures',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <div className={styles.page}>
      <header>
        <h1>Complex Metronome</h1>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <div style={{flexGrow: 1}}></div>
      <footer className={styles.footer}>
        <p>
          Bug Reports and Feature Requests : tell me
          {' '}
          <a href="https://x.com/t_motooka" rel="noopener" target="_blank">@t_motooka</a>
          {' '}
          on Twitter(X).
          Programmers can also use
          {' '}
          <a href="https://github.com/motooka/complex-metronome/" target="_blank" rel="noopener">GitHub Issues : motooka/complex-metronome</a>
        </p>
        <div>
          copyright &copy;
          <a
            href="https://www.tmotooka.com/"
            target="_blank"
            rel="noopener"
          >T.MOTOOKA</a>
        </div>
        <div>
          license : <a href="https://github.com/motooka/complex-metronome/blob/main/LICENSE" target="_blank" rel="noopener">MIT</a>
        </div>
        <div>
          build version <code>{buildInfo.built}</code>
        </div>
      </footer>
    </div>
    </body>
    </html>
  );
}
