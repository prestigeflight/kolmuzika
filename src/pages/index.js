// src/pages/index.js

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../components/Logo';
import styles from '../styles/Home.module.css';
export default function Home() {
  return (<>
    <div className={styles.container}>
    <Head>
            <title>כלמוזיקה - בית</title>
            <meta name="description" content={`Discover Your Favourite Song Info with lyrics, chords, and VST guides.`} />
            <meta property="og:title" content="Home - Kolmuzika"/>
            <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
            <meta property="og:description" content={`Discover Your Favourite Song Info with lyrics, chords, and VST guides.`} />
            <meta property="og:image" content="/favicon.png"/>
            <meta property="og:url" content={`https://kolmuzika.vercel.app/`} />
            <meta property="og:type" content="music.song" />
            <meta name="twitter:card" content="/favicon.png"/>
            <meta name="twitter:title" content="Home - Kolmuzika"/>
            <meta name="twitter:description" content={`Discover Your Favourite Song Info with lyrics, chords, and VST guides.`} />
            <meta name="twitter:image" content="/favicon.png"/>
        </Head>
      <main className={styles.main}>
        <section className={styles.introduction}>
          <h2>Discover Your Favourite Song Info</h2>
          <p>
            Explore our extensive collection of songs, including their lyrics and chords. Whether you&apos;re a beginner or an experienced musician, you&apos;ll find everything you need to enhance your musical journey
          </p>
          <p>
            Join our community and share your musical insights, discover new talents, and learn more about music production through our VST guides
          </p>
          
          <Logo className={styles.logoWrapper} />
          
          <button className={styles.ctaButton}><Link href="/songs">Get Started</Link></button>
        </section>
      </main>
    </div></>
  );
}
