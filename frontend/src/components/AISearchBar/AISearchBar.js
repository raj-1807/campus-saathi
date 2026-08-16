'use client';

import { Sparkles, Mic, ArrowRight } from 'lucide-react';
import styles from './AISearchBar.module.css';

export default function AISearchBar({ placeholder, onSubmit, value, onChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <Sparkles size={18} className={styles.sparkleIcon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder || 'Ask about anything on campus...'}
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <button type="button" className={styles.micBtn} aria-label="Voice input">
        <Mic size={18} />
      </button>
      <button type="submit" className={styles.submitBtn} aria-label="Send">
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
