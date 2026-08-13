'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarX } from 'lucide-react';
import EventCard from '@/components/EventCard/EventCard';
import { EVENT_CATEGORIES } from '@/utils/constants';
import styles from './events.module.css';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isOther: true });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isOther: false });
  }

  // Next month days
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isOther: true });
  }

  return days;
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const res = await fetch(`/api/events?category=${activeCategory}`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data.events || []);
        }
      } catch {
        setEvents([]);
      }
      setLoading(false);
    }
    fetchEvents();
  }, [activeCategory]);

  const calendarDays = useMemo(() => getCalendarDays(calYear, calMonth), [calYear, calMonth]);

  // Set of days with events for the current calendar month
  const eventDays = useMemo(() => {
    const days = new Set();
    events.forEach((e) => {
      const d = new Date(e.date);
      if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
        days.add(d.getDate());
      }
    });
    return days;
  }, [events, calYear, calMonth]);

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  const monthLabel = new Date(calYear, calMonth).toLocaleString('en', {
    month: 'long',
    year: 'numeric',
  });

  const today = now.getDate();
  const isCurrentMonth =
    calYear === now.getFullYear() && calMonth === now.getMonth();

  const filteredEvents =
    activeCategory === 'all'
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <div className={styles.eventsPage}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className="gradient-text">Events</span> & Notices
        </h1>
        <p className={styles.subtitle}>
          Stay updated with campus events, workshops, and important notices
        </p>
      </div>

      <div className={styles.layout}>
        {/* Calendar Sidebar */}
        <div className={styles.calendar}>
          <div className={styles.calHeader}>
            <span className={styles.calMonth}>{monthLabel}</span>
            <div className={styles.calNav}>
              <button className={styles.calNavBtn} onClick={prevMonth}>
                <ChevronLeft size={18} />
              </button>
              <button className={styles.calNavBtn} onClick={nextMonth}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className={styles.calGrid}>
            {DAY_NAMES.map((d) => (
              <div key={d} className={styles.calDayName}>
                {d}
              </div>
            ))}
            {calendarDays.map((item, i) => {
              const isToday = isCurrentMonth && !item.isOther && item.day === today;
              const hasEvent = !item.isOther && eventDays.has(item.day);

              return (
                <div
                  key={i}
                  className={`${styles.calDay} ${item.isOther ? styles.calDayOther : ''} ${isToday ? styles.calDayToday : ''} ${hasEvent ? styles.calDayHasEvent : ''}`}
                >
                  {item.day}
                  {hasEvent && <span className={styles.calDayDot} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events List */}
        <div>
          {/* Filters */}
          <div className={styles.filters}>
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={
                  activeCategory === cat.id
                    ? { borderColor: cat.color, color: cat.color }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.eventsList}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: 120, borderRadius: 'var(--radius-lg)' }}
                />
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <>
              <div className={styles.eventsCount}>
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              </div>
              <div className={styles.eventsList}>
                {filteredEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <CalendarX size={28} />
              </div>
              <h3 className={styles.emptyTitle}>No events found</h3>
              <p className={styles.emptyDesc}>
                No events in this category. Try selecting a different filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
