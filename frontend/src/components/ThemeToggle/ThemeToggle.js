'use client';

import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      id="theme-toggle"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className={styles.iconWrap}>
        <Sun
          className={`${styles.icon} ${theme === 'light' ? styles.iconVisible : styles.iconHidden}`}
          size={20}
        />
        <Moon
          className={`${styles.icon} ${theme === 'dark' ? styles.iconVisible : styles.iconHidden}`}
          size={20}
        />
      </span>
    </button>
  );
}
