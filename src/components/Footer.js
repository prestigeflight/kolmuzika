// src/components/Footer.js
// For Header.js and Footer.js# // If it's a global CSS file
// Adjust the path as necessary
import styles from '../styles/Home.module.css'; 
import Logo from './Logo';
import Link from 'next/link';
const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['hd-logo']}>
            <text x="0" y="0" style={{ fontFamily: 'Rubik, sans-serif', fontWeight: '700' }} fontSize="24" fill="url(#textGradient)" direction="rtl">
                    KOLMUZIKA
                    </text>
            </div>
            <div className={styles.linksContainer}>
            <Link href="https://youtube.com/@prestigesynth" target="_blank" rel="noopener noreferrer">
          YouTube
        </Link>
            <Link href="/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </Link>
        <Link href="https://enbybase.web.app/miles" target="_blank" rel="noopener noreferrer">
          EMI Miles
        </Link>
      </div>
        </footer>
    );
};

export default Footer;
