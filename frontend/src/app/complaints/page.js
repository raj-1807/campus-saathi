'use client';

import { useState } from 'react';
import { Upload, Search, CheckCircle2, Clock, AlertTriangle, Send } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import AISearchBar from '@/components/AISearchBar/AISearchBar';
import { COMPLAINTS_DATA } from '@/utils/constants';
import styles from './complaints.module.css';

const STATUS_CONFIG = {
  'Resolved': { color: 'var(--success)', bg: 'var(--success-light)', icon: CheckCircle2 },
  'In Review': { color: 'var(--warning)', bg: 'var(--warning-light)', icon: Clock },
  'Escalated': { color: 'var(--error)', bg: 'var(--error-light)', icon: AlertTriangle },
  'Submitted': { color: 'var(--primary)', bg: 'var(--primary-50)', icon: Send },
};

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackId, setTrackId] = useState('');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Complaints' }]} />
        <h1 className={styles.pageTitle}>Complaints & Grievances</h1>
      </div>

      {/* AI Search */}
      <div className={styles.searchWrap}>
        <AISearchBar
          placeholder="Ask about complaint status, policies, or escalation process..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className={styles.content}>
        {/* Left: File & Track */}
        <div className={styles.mainArea}>
          {/* File Complaint */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>File a Complaint</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select className={styles.select}>
                  <option value="">Select category</option>
                  {COMPLAINTS_DATA.categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Subject</label>
                <input type="text" className={styles.input} placeholder="Brief subject of complaint" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea className={styles.textarea} rows={4} placeholder="Describe your issue in detail..." />
            </div>
            <div className={styles.formActions}>
              <button className={styles.attachBtn}>
                <Upload size={14} /> Attach File
              </button>
              <button className={styles.submitBtn}>Submit Complaint</button>
            </div>
          </div>

          {/* Track Complaint */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Track a Complaint</h3>
            <div className={styles.trackRow}>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter Complaint ID (e.g., #CS-2024-0145)"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
              />
              <button className={styles.trackBtn}>
                <Search size={14} /> Track
              </button>
            </div>
          </div>

          {/* Submitted Complaints */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Your Submitted Complaints</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {COMPLAINTS_DATA.submitted.map((c, i) => {
                  const statusConf = STATUS_CONFIG[c.status];
                  return (
                    <tr key={i}>
                      <td className={styles.idCol}>{c.id}</td>
                      <td>{c.subject}</td>
                      <td>{c.category}</td>
                      <td>
                        <span
                          className={styles.statusBadge}
                          style={{ color: statusConf.color, background: statusConf.bg }}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td>{c.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Active Complaint Tracker */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Active Complaint Tracker</h3>
            <div className={styles.trackerInfo}>
              <span className={styles.trackerId}>{COMPLAINTS_DATA.activeComplaint.id}</span>
              <p className={styles.trackerSubject}>{COMPLAINTS_DATA.activeComplaint.subject}</p>
            </div>
            <div className={styles.timeline}>
              {COMPLAINTS_DATA.activeComplaint.timeline.map((step, i) => (
                <div key={i} className={`${styles.timelineItem} ${styles[`timeline_${step.status}`]}`}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineStep}>{step.step}</div>
                    <div className={styles.timelineDate}>{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
