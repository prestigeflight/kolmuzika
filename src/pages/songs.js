import { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../../firebaseConfig';
import styles from '../styles/Songs.module.css';
import Logo from '../components/Logo';
import Link from 'next/link';
import Head from 'next/head';

const Songs = () => {
    const [songs, setSongs] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12); // Track how many songs to show
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        const fetchSongs = () => {
            const songsRef = ref(database, '/songs');
            onValue(songsRef, (snapshot) => {
                const songsData = snapshot.val();
                const songsList = [];

                for (let id in songsData) {
                    songsList.push({ id, ...songsData[id] });
                }

                setSongs(songsList);
            });

            // Cleanup listener on component unmount
            return () => {
                off(songsRef);
            };
        };

        fetchSongs();
    }, []);

    // Load more songs
    const loadMoreSongs = () => {
        setVisibleCount((prevCount) => prevCount + 12); // Increase the visible count
    };

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter songs based on search query
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (<>
        <Head>
            <title>כלמוזיקה - שירים</title>
            <meta name="description" content={`Find song info of our database with lyrics, chords, and VST guides.`} />
            <meta property="og:title" content="Songs - Kolmuzika"/>
            <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
            <meta property="og:description" content={`Find song info of our database with lyrics, chords, and VST guides.`} />
            <meta property="og:image" content="/Logo.svg"/>
            <meta property="og:url" content={`https://kolmuzika.web.app/songs/`} />
            <meta property="og:type" content="music.song" />
            <meta name="twitter:card" content="/Logo.svg"/>
            <meta name="twitter:title" content="Songs - Kolmuzika"/>
            <meta name="twitter:description" content={`Find song info of our database with lyrics, chords, and VST guides.`} />
            <meta name="twitter:image" content="/Logo.svg"/>
        </Head>
        <div className={styles.container}>
            <h1 className={styles.title}>שירים - Songs</h1>
            <div className={styles.searchContainer}>
            {/* Search Input Field */}
            <input
                type="text"
                placeholder="חפש שיר..." // "Search for a song..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput} // Add appropriate styling
            />
</div>
            <div className={styles.grid}>
                {filteredSongs.slice(0, visibleCount).map((song) => (
                    <Link href={`/songs/${song.id}`} key={song.id} className={styles.card}>
                        <img className={styles.albumImg} src={song.albumimg} alt={song.title} />
                        <div className={styles.songTitle}>{song.title}</div>
                        <div className={styles.artists}>{song.artists.join(', ')}</div>
                        <div className={styles.releasedYear}>{song.releasedyear}</div>
                    </Link>
                ))}
            </div>

            {visibleCount < filteredSongs.length && (
                <button onClick={loadMoreSongs} className={styles.loadMoreButton}>
                    עוד - Load More
                </button>
            )}
        </div></>
    );
};

export default Songs;
