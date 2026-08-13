'use client';

import { Clock, MapPin, Timer } from 'lucide-react';
import { EVENT_CATEGORIES } from '@/utils/constants';
import styles from './EventCard.module.css';

function getCountdown(dateStr) {
  const eventDate = new Date(dateStr);
  const now = new Date();
  const diff = eventDate - now;

  if (diff < 0) return { text: 'Past event', isPast: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return { text: `${days}d ${hours}h left`, isPast: false };
  if (hours > 0) return { text: `${hours}h left`, isPast: false };
  return { text: 'Today!', isPast: false };
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  return { month, day };
}

export default function EventCard({ event, index }) {
  const { month, day } = formatDate(event.date);
  const countdown = getCountdown(event.date);
  const catConfig = EVENT_CATEGORIES.find((c) => c.id === event.category) || EVENT_CATEGORIES[0];

  return (
    <div
      className={styles.eventCard}
      style={{
        borderLeftColor: catConfig.color,
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Date Badge */}
      <div className={styles.dateBadge}>
        <span className={styles.dateMonth}>{month}</span>
        <span className={styles.dateDay}>{day}</span>
      </div>

      {/* Content */}
      <div className={styles.eventContent}>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventDesc}>{event.description}</p>

        <div className={styles.eventMeta}>
          {event.time && (
            <span className={styles.eventMetaItem}>
              <Clock size={12} />
              {event.time}
            </span>
          )}
          {event.location && (
            <span className={styles.eventMetaItem}>
              <MapPin size={12} />
              {event.location}
            </span>
          )}
          <span
            className={styles.eventCategory}
            style={{
              background: `${catConfig.color}15`,
              color: catConfig.color,
              border: `1px solid ${catConfig.color}30`,
            }}
          >
            {catConfig.label}
          </span>
          <span
            className={`${styles.countdown} ${countdown.isPast ? styles.countdownPast : ''}`}
          >
            <Timer size={12} />
            {countdown.text}
          </span>
        </div>
      </div>
    </div>
  );
}
