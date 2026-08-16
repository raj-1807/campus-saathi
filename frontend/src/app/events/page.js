'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarX, MapPin, Clock, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import AISearchBar from '@/components/AISearchBar/AISearchBar';
import { DEMO_EVENTS, EVENT_CATEGORIES, REGISTERED_EVENTS } from '@/utils/constants';
import styles from './events.module.css';

const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function getCalendarDays(year, month) {
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-based
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isOther: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isOther: false });
  }
  const remaining = 35 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isOther: true });
  }
  return days;
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  const calendarDays = useMemo(() => getCalendarDays(calYear, calMonth), [calYear, calMonth]);
  const today = now.getDate();
  const isCurrentMonth = calYear === now.getFullYear() && calMonth === now.getMonth();

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

  const monthLabel = new Date(calYear, calMonth).toLocaleString('en', { month: 'long', year: 'numeric' });

  const flagship = DEMO_EVENTS.find(e => e.isFlagship);
  const regularEvents = DEMO_EVENTS.filter(e => !e.isFlagship);
  const filteredEvents = activeCategory === 'all' ? regularEvents : regularEvents.filter(e => e.category === activeCategory);

  const getCategoryLabel = (cat) => EVENT_CATEGORIES.find(c => c.id === cat)?.label || cat;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />
        <h1 className={styles.pageTitle}>Events & Campus Life</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          {/* AI Search */}
          <AISearchBar
            placeholder="Ask about upcoming events, schedules, or registration deadlines..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Flagship Event */}
          {flagship && (
            <div className={styles.flagship}>
              <div className={styles.flagshipImage}>
                <div className={styles.flagshipPlaceholder}>
                  <CalendarX size={40} />
                </div>
              </div>
              <div className={styles.flagshipContent}>
                <div className={styles.flagshipBadges}>
                  <span className={styles.flagshipBadge}>FLAGSHIP EVENT</span>
                  <span className={styles.flagshipType}>Technical Fest</span>
                </div>
                <h2 className={styles.flagshipTitle}>{flagship.title}</h2>
                <p className={styles.flagshipDesc}>{flagship.description}</p>
                <div className={styles.flagshipMeta}>
                  <span><Clock size={14} /> {flagship.date} - {flagship.endDate}</span>
                  <span><MapPin size={14} /> {flagship.location}</span>
                </div>
                <button className={styles.registerBtn}>Register Now</button>
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className={styles.filters}>
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className={styles.eventsGrid}>
            {filteredEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventImage}>
                  <div className={styles.eventPlaceholder} />
                </div>
                <div className={styles.eventBody}>
                  <span className={styles.eventCategory} style={{ background: EVENT_CATEGORIES.find(c => c.id === event.category)?.color, color: 'white' }}>
                    {getCategoryLabel(event.category).toUpperCase()}
                  </span>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDesc}>{event.description}</p>
                  <div className={styles.eventMeta}>
                    <span><Clock size={12} /> {event.date}, {event.time}</span>
                    <span><MapPin size={12} /> {event.location}</span>
                  </div>
                  <a href="#" className={styles.eventLink}>View details <ArrowRight size={14} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Calendar */}
          <div className={styles.sidebarCard}>
            <div className={styles.calHeader}>
              <h3 className={styles.sidebarTitle}>Campus Calendar</h3>
              <div className={styles.calNav}>
                <button className={styles.calNavBtn} onClick={prevMonth}><ChevronLeft size={16} /></button>
                <button className={styles.calNavBtn} onClick={nextMonth}><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className={styles.calGrid}>
              {DAY_NAMES.map(d => (
                <div key={d} className={styles.calDayName}>{d}</div>
              ))}
              {calendarDays.map((item, i) => {
                const isTodayCell = isCurrentMonth && !item.isOther && item.day === today;
                return (
                  <div
                    key={i}
                    className={`${styles.calDay} ${item.isOther ? styles.calDayOther : ''} ${isTodayCell ? styles.calDayToday : ''}`}
                  >
                    {item.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registered Events */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Your Registered Events</h3>
            <div className={styles.registeredList}>
              {REGISTERED_EVENTS.map((e, i) => (
                <div key={i} className={styles.registeredItem}>
                  <div>
                    <div className={styles.registeredTitle}>{e.title}</div>
                    <div className={styles.registeredDate}>{e.date}</div>
                  </div>
                  <span className={`${styles.registeredStatus} ${styles[`status_${e.status.toLowerCase()}`]}`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
