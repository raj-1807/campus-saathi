'use client';

import { useState } from 'react';
import {
  CreditCard,
  Award,
  Home,
  BookOpen,
  Bus,
  BadgeCheck,
  Download,
  FileEdit,
  Calendar,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import AISearchBar from '@/components/AISearchBar/AISearchBar';
import { SERVICES_DATA } from '@/utils/constants';
import styles from './services.module.css';

const portalIcons = { CreditCard, Award, Home, BookOpen, Bus, BadgeCheck };
const actionIcons = { Download, FileEdit, Home, BadgeCheck };

const statusColorMap = {
  success: { color: 'var(--success)', bg: 'var(--success-light)' },
  info: { color: 'var(--primary)', bg: 'var(--primary-50)' },
  warning: { color: 'hsl(38, 70%, 35%)', bg: 'var(--warning-light)' },
  error: { color: 'var(--error)', bg: 'var(--error-light)' },
};

const deadlineColorMap = {
  error: { color: 'var(--error)', bg: 'var(--error-light)' },
  warning: { color: 'hsl(38, 70%, 35%)', bg: 'var(--warning-light)' },
  info: { color: 'var(--primary)', bg: 'var(--primary-50)' },
  success: { color: 'var(--success)', bg: 'var(--success-light)' },
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
        <h1 className={styles.pageTitle}>Student Services</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          {/* AI Search */}
          <AISearchBar
            placeholder="Ask about tuition fees, library, transport schedules..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Available Portals */}
          <h3 className={styles.sectionTitle}>Available Portals & Services</h3>
          <div className={styles.portalsGrid}>
            {SERVICES_DATA.portals.map((portal, i) => {
              const Icon = portalIcons[portal.icon];
              const sc = statusColorMap[portal.statusColor];
              return (
                <a key={i} href={portal.link} className={styles.portalCard}>
                  <div className={styles.portalHeader}>
                    <div className={styles.portalIcon}>
                      {Icon && <Icon size={20} />}
                    </div>
                    <span className={styles.portalBadge} style={{ color: sc.color, background: sc.bg }}>
                      {portal.status}
                    </span>
                  </div>
                  <h4 className={styles.portalTitle}>{portal.title}</h4>
                  <span className={styles.portalLink}>View details</span>
                </a>
              );
            })}
          </div>

          {/* Quick Actions */}
          <h3 className={styles.sectionTitle}>Quick Actions</h3>
          <div className={styles.quickActions}>
            {SERVICES_DATA.quickActions.map((action, i) => {
              const Icon = actionIcons[action.icon];
              return (
                <button key={i} className={styles.quickAction}>
                  {Icon && <Icon size={16} />}
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar — Upcoming Deadlines */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Upcoming Deadlines</h3>
            <div className={styles.deadlinesList}>
              {SERVICES_DATA.deadlines.map((d, i) => {
                const dc = deadlineColorMap[d.color];
                return (
                  <div key={i} className={styles.deadlineItem}>
                    <span className={styles.deadlineBadge} style={{ color: dc.color, background: dc.bg }}>
                      {d.date}
                    </span>
                    <span className={styles.deadlineLabel}>{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
