'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import AISearchBar from '@/components/AISearchBar/AISearchBar';
import { ADMISSION_DATA } from '@/utils/constants';
import styles from './admission.module.css';

const TABS = ['Overview', 'Eligibility Checker', 'Cutoff Trends', 'Document Checklist'];

export default function AdmissionPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Admission' }]} />
        <h1 className={styles.pageTitle}>Admission Information</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          {/* AI Search */}
          <AISearchBar
            placeholder="Ask about admission criteria, cutoffs, or documents..."
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Tabs */}
          <div className={styles.tabs}>
            {TABS.map((tab, i) => (
              <button
                key={i}
                className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 0 && (
              <div className={styles.overviewContent}>
                <h3 className={styles.contentTitle}>Admission Process</h3>
                <p className={styles.contentText}>{ADMISSION_DATA.overview.content}</p>
                <div className={styles.stepsList}>
                  {ADMISSION_DATA.overview.steps.map((step, i) => (
                    <div key={i} className={styles.step}>
                      <span className={styles.stepNum}>{i + 1}</span>
                      <span className={styles.stepText}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className={styles.overviewContent}>
                <h3 className={styles.contentTitle}>Check Your Eligibility</h3>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Course Type</label>
                  <select className={styles.select}>
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                    <option>MBA</option>
                    <option>PhD</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.select}>
                    <option>General</option>
                    <option>OBC</option>
                    <option>SC/ST</option>
                    <option>EWS</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>12th Percentage</label>
                  <input type="number" className={styles.input} placeholder="Enter percentage" />
                </div>
                <button className={styles.checkBtn}>Check Eligibility</button>
              </div>
            )}
            {activeTab === 2 && (
              <div className={styles.overviewContent}>
                <h3 className={styles.contentTitle}>Cutoff Trends (Last 3 Years)</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>2024</th>
                      <th>2023</th>
                      <th>2022</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Computer Science</td><td>98.2%</td><td>97.8%</td><td>96.5%</td></tr>
                    <tr><td>Electronics</td><td>95.4%</td><td>94.9%</td><td>93.2%</td></tr>
                    <tr><td>Mechanical</td><td>90.1%</td><td>89.5%</td><td>88.0%</td></tr>
                    <tr><td>Civil</td><td>87.3%</td><td>86.8%</td><td>85.1%</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 3 && (
              <div className={styles.overviewContent}>
                <h3 className={styles.contentTitle}>Required Documents</h3>
                <div className={styles.checklist}>
                  {[
                    'Class X Marksheet & Certificate',
                    'Class XII Marksheet & Certificate',
                    'JEE Main Scorecard',
                    'Transfer Certificate',
                    'Migration Certificate',
                    'Character Certificate',
                    'Category Certificate (if applicable)',
                    'Passport-size Photographs (4)',
                    'Aadhaar Card',
                    'Medical Fitness Certificate',
                  ].map((doc, i) => (
                    <label key={i} className={styles.checkItem}>
                      <input type="checkbox" className={styles.checkbox} />
                      <span>{doc}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className={styles.sidebar}>
          {/* Related Queries */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Related Queries</h3>
            <div className={styles.queryLinks}>
              {ADMISSION_DATA.relatedQueries.map((q, i) => (
                <a key={i} href="#" className={styles.queryLink}>{q}</a>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Important Dates</h3>
            <div className={styles.datesList}>
              {ADMISSION_DATA.importantDates.map((d, i) => (
                <div key={i} className={styles.dateItem}>
                  <span className={styles.dateBadge}>{d.date}</span>
                  <span className={styles.dateLabel}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
