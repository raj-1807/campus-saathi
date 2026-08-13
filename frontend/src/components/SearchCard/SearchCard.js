'use client';

import { FileText } from 'lucide-react';
import styles from './SearchCard.module.css';

export function SearchCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={`${styles.skelLine} ${styles.skelTitle}`} />
      <div className={`${styles.skelLine} ${styles.skelContent}`} />
      <div className={`${styles.skelLine} ${styles.skelContent2}`} />
      <div className={`${styles.skelLine} ${styles.skelBottom}`} />
    </div>
  );
}

export default function SearchCard({ result, index }) {
  return (
    <div
      className={styles.searchCard}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.cardTop}>
        <h3 className={styles.cardTitle}>{result.title}</h3>
        <span className={styles.categoryBadge}>{result.category}</span>
      </div>

      <p className={styles.cardContent}>{result.content}</p>

      <div className={styles.cardBottom}>
        <span className={styles.sourceLabel}>
          <FileText size={12} />
          {result.source}
        </span>
        <div className={styles.relevanceWrap}>
          <span className={styles.relevanceLabel}>
            {Math.round(result.relevance * 100)}%
          </span>
          <div className={styles.relevanceBar}>
            <div
              className={styles.relevanceFill}
              style={{ width: `${result.relevance * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
