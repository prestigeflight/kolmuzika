// src/pages/songs/[songname].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { database } from '../../../firebaseConfig';
import { ref, get, child } from 'firebase/database';
import Head from 'next/head';
import Logo from '../../components/Logo';
import styles from '../../styles/Songs.module.css';

const SongPage = () => {
  const router = useRouter();
  const { songname } = router.query;
  const [song, setSong] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [showArtists, setShowArtists] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showProgression, setShowProgression] = useState(false);
  const [showVSTGuide, setShowVSTGuide] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false); // New state for lyrics visibility

  useEffect(() => {
    if (songname) {
      const fetchSongData = async () => {
        const dbRef = ref(database);
        const songRef = child(dbRef, `songs/${songname}`);
        const snapshot = await get(songRef);
        if (snapshot.exists()) {
          const songData = snapshot.val();
          setSong(songData);
          setCurrentLanguage(songData.mainlanguage);
        } else {
          console.log("No data available");
        }
      };
      fetchSongData();
    }
  }, [songname]);

  const handleLanguageToggle = (language) => {
    if (currentLanguage === language) {
      setShowLyrics(!showLyrics); // Toggle visibility if the same language is clicked
    } else {
      setCurrentLanguage(language); // Set new language
      setShowLyrics(true); // Show lyrics for the new language
    }
  };

  const languageFlags = {
    en: '🇬🇧',
    he: '🇮🇱',
    th: '🇹🇭',
    ko: '🇰🇷',
    zh: '🇨🇳',
  };

  if (!song) {
    return <p>Loading...</p>;
  }

  return (<>
    <Head>
        <title>{song.title} - כלמוזיקה </title>
        <meta name="description" content={`Find Info of ${song.title} by ${song.artists.join(', ')}. Released in ${song.releasedyear}.`} />
        <meta property="og:title" content={song.title}/>
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <meta property="og:description" content={`Find Info of ${song.title} by ${song.artists.join(', ')}. Released in ${song.releasedyear}.`} />
        <meta property="og:image" content={song.albumimg}/>
        <meta property="og:url" content={`https://kolmuzika.vercel.app/songs/${songname}`} />
        <meta property="og:type" content="music.song" />
        <meta name="twitter:card" content={song.albumimg}/>
        <meta name="twitter:title" content={song.title}/>
        <meta name="twitter:description" content={`Find Info of ${song.title} by ${song.artists.join(', ')}. Released in ${song.releasedyear}.`} />
        <meta name="twitter:image" content={song.albumimg}/>
    </Head>
    <div className={styles['container']}>
      <div className={styles.songContainer}>
        <img className={styles['sn-albumImg']} src={song.albumimg} alt={`${song.title} album cover`} />
        <div className={styles.details}>
          <h2>{song.title}</h2>

          <h5>{song.releasedyear}</h5>
          <h4 onClick={() => setShowArtists(!showArtists)} className={styles.toggleHeader}>
            Artists←
          </h4>
          <p className={`${styles.toggleContent} ${showArtists ? styles.show : styles.hide}`}>
            {song.artists.join(', ')}
          </p>

          <h4 onClick={() => setShowGenres(!showGenres)} className={styles.toggleHeader}>
            Genres←
          </h4>
          <p className={`${styles.toggleContent} ${showGenres ? styles.show : styles.hide}`}>
            {song.genres.join(', ')}
          </p>

          <h4 onClick={() => setShowProgression(!showProgression)} className={styles.toggleHeader}>
            Progression←
          </h4>
          <p className={`${styles.toggleContent} ${showProgression ? styles.show : styles.hide}`}>
            BPM: {song.bpm}<br /> Key: {song.key}<br /> Chords: {song.chords.map((chord, index) => (
              <span key={index}>{chord}{index < song.chords.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
        </div>
      </div>

      

      <div className={styles['sn-songPage']}>
      <h3 style={{marginBottom: '-8px'}}>Lyrics</h3>
      <p style={{fontSize:'15px'}}>Main Language: {song.mainlanguage || language.charAt(0).toUpperCase() + language.slice(1)}</p>
        <div className={styles['sn-languages']}>
          {Object.keys(song.lyrics).map((language) => (
            <button
              key={language}
              className={`${styles['sn-languageButton']} ${currentLanguage === language ? styles['sn-active'] : ''} ${song.mainlanguage === language ? styles['sn-main'] : ''}`}
              onClick={() => handleLanguageToggle(language)}
            >
              {languageFlags[language] || language.charAt(0).toUpperCase() + language.slice(1)}
            </button>
          ))}
        </div>

        <div className={`${styles['sn-lyrics']} ${currentLanguage === 'he' ? styles['sn-rtl'] : ''}`}>
          {Object.entries(song.lyrics).map(([language, text]) => (
            <div key={language}
              className={`${styles['sn-lyricsText']} ${currentLanguage === language && showLyrics ? styles['sn-visible'] : styles['sn-hidden']}`}>
              <h2>{languageFlags[language]  || language.charAt(0).toUpperCase() + language.slice(1)} Lyrics</h2>
              <p>
                {text.split('\n').map((line, index) => (
                  <span key={index}>{line}<br /></span>
                ))}
              </p>
            </div>
          ))}
        </div>

        
        <h3 onClick={() => setShowVSTGuide(!showVSTGuide)} className={styles.toggleHeader}>VST Guide←</h3>
<div className={`${styles['vst-container']} ${showVSTGuide ? styles['vst-show'] : ''}`}>
  {Object.entries(song.vstguide).map(([section, vstList]) => (
    <div key={section} className={styles['vst-section']}>
     <h3>{section ? section.charAt(0).toUpperCase() + section.slice(1) : "Untitled Section"}</h3>
      <ul className={styles['vst-list']}>
        {vstList.map((vst, index) => (
          <li key={index}>{vst}</li>
        ))}
      </ul>
    </div>
  ))}
</div>

      </div>
    </div></>
  );
};

export default SongPage;
