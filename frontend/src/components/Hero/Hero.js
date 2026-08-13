'use client';

import Link from 'next/link';
import {
  MessageCircle,
  Search,
  Calendar,
  ArrowRight,
  Sparkles,
  FileText,
  Clock,
  Globe,
} from 'lucide-react';
import { LANDING_STATS } from '@/utils/constants';
import styles from './Hero.module.css';

const statIconMap = {
  MessageCircle,
  FileText,
  Clock,
  Globe,
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.heroBg} />
      <div className={styles.particles}>
        <div className={`${styles.particle} ${styles.particle1}`} />
        <div className={`${styles.particle} ${styles.particle2}`} />
        <div className={`${styles.particle} ${styles.particle3}`} />
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI-Powered Campus Assistant
        </div>

        <h1 className={styles.title}>
          Your <span className="gradient-text">AI Campus</span> Companion
        </h1>

        <p className={styles.subtitle}>
          Ask questions about admissions, courses, facilities, events, and more —
          get instant, accurate answers powered by AI.
        </p>

        <div className={styles.ctas}>
          <Link href="/chat" className={styles.ctaPrimary}>
            <Sparkles size={18} />
            Start Chatting
            <ArrowRight size={18} />
          </Link>
          <Link href="/search" className={styles.ctaSecondary}>
            <Search size={18} />
            Search Documents
          </Link>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className={styles.actions}>
        <Link href="/chat" className={styles.actionCard}>
          <div className={`${styles.actionIcon} ${styles.actionIconChat}`}>
            <MessageCircle size={26} />
          </div>
          <span className={styles.actionTitle}>Ask a Question</span>
          <span className={styles.actionDesc}>
            Chat with our AI about anything campus-related
          </span>
        </Link>

        <Link href="/search" className={styles.actionCard}>
          <div className={`${styles.actionIcon} ${styles.actionIconSearch}`}>
            <Search size={26} />
          </div>
          <span className={styles.actionTitle}>Search Documents</span>
          <span className={styles.actionDesc}>
            Find information across campus documents and notices
          </span>
        </Link>

        <Link href="/events" className={styles.actionCard}>
          <div className={`${styles.actionIcon} ${styles.actionIconEvents}`}>
            <Calendar size={26} />
          </div>
          <span className={styles.actionTitle}>View Events</span>
          <span className={styles.actionDesc}>
            Stay updated with campus events, workshops, and notices
          </span>
        </Link>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {LANDING_STATS.map((stat, i) => {
          const Icon = statIconMap[stat.icon];
          return (
            <div key={i} className={styles.stat}>
              <div className={styles.statIcon}>
                {Icon && <Icon size={20} />}
              </div>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
