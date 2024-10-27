// src/components/Header.js
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Logo from './Logo';
import Link from 'next/link';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles['hd-header']}>
            {/* Menu Icon for Mobile */}
           

            {/* Logo */}
            <div className={styles['hd-logo']}>
            <Logo width={50} height={50} />
                <svg width="150" height="50" xmlns="http://www.w3.org/2000/svg">
                <defs>
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: '#F5A9B8', stopOpacity: 1 }} />
    </linearGradient>
  </defs>
                    <text x="150" y="33" style={{ fontFamily: 'Rubik, sans-serif', fontWeight: '700' }} fontSize="24" fill="url(#textGradient)" direction="rtl">
                    כלמוזיקה 
                    </text>
                </svg>
            </div>
            <div className={styles['hd-menu-button']} onClick={toggleMenu}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="7" y1="8" x2="17" y2="8" stroke="black" strokeWidth="2" />
                    <line x1="7" y1="12" x2="17" y2="12" stroke="black" strokeWidth="2" />
                    <line x1="7" y1="16" x2="17" y2="16" stroke="black" strokeWidth="2" />
                </svg>
            </div>
            {/* Navigation Links */}
            <nav className={`${styles['hd-nav']} ${isOpen ? styles['hd-nav-open'] : ''}`}>
      <ul>
        <li>
          <Link href="/">בית - Home</Link>
        </li>
        <li>
          <Link href="/songs">שירים - Songs</Link>
        </li>
        <li>
          <Link href="/about">מי אנחנו - About</Link>
        </li>
      </ul>
    </nav>
        </header>
    );
};

export default Header;
