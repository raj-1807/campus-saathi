'use client';

import { useState } from 'react';
import {
  Building2,
  TrendingUp,
  BarChart3,
  Users,
  FileText,
  Video,
  Globe,
  Calendar,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import AISearchBar from '@/components/AISearchBar/AISearchBar';
import { PLACEMENT_DATA } from '@/utils/constants';
import styles from './placement.module.css';

const iconMap = { Building2, TrendingUp, BarChart3, Users };
const TABS = ['Placement Stats', 'Company Directory', 'Interview Prep', 'Internships'];

export default function PlacementPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Training & Placement' }]} />
        <h1 className={styles.pageTitle}>Training & Placement</h1>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {PLACEMENT_DATA.stats.map((stat, i) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIcon}>
                {Icon && <Icon size={20} />}
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          {/* AI Search */}
          <AISearchBar
            placeholder="Ask about placements, companies, packages, or interview prep..."
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
              <div>
                <h3 className={styles.contentTitle}>Recent Placement Data</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Package</th>
                      <th>Placed</th>
                      <th>Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLACEMENT_DATA.companies.map((c, i) => (
                      <tr key={i}>
                        <td className={styles.companyName}>{c.company}</td>
                        <td>{c.role}</td>
                        <td className={styles.packageCol}>{c.package}</td>
                        <td>{c.placed}</td>
                        <td>{c.batch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 1 && (
              <div className={styles.companyGrid}>
                {PLACEMENT_DATA.companies.map((c, i) => (
                  <div key={i} className={styles.companyCard}>
                    <div className={styles.companyCardIcon}>
                      <Building2 size={20} />
                    </div>
                    <div className={styles.companyCardName}>{c.company}</div>
                    <div className={styles.companyCardRole}>{c.role}</div>
                    <div className={styles.companyCardPackage}>{c.package}</div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className={styles.prepContent}>
                <h3 className={styles.contentTitle}>Interview Preparation</h3>
                <div className={styles.prepGrid}>
                  {[
                    { title: 'Data Structures & Algorithms', desc: 'Practice 200+ problems', progress: 65 },
                    { title: 'System Design', desc: 'Learn scalable architecture', progress: 30 },
                    { title: 'Aptitude & Reasoning', desc: 'Quantitative and logical', progress: 80 },
                    { title: 'Communication Skills', desc: 'HR round preparation', progress: 50 },
                  ].map((item, i) => (
                    <div key={i} className={styles.prepCard}>
                      <h4 className={styles.prepTitle}>{item.title}</h4>
                      <p className={styles.prepDesc}>{item.desc}</p>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className={styles.progressText}>{item.progress}% complete</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div>
                <h3 className={styles.contentTitle}>Available Internships</h3>
                <div className={styles.internList}>
                  {[
                    { company: 'Google', role: 'SWE Intern', stipend: '₹80K/month', deadline: 'Oct 20' },
                    { company: 'Microsoft', role: 'PM Intern', stipend: '₹75K/month', deadline: 'Oct 25' },
                    { company: 'Amazon', role: 'SDE Intern', stipend: '₹60K/month', deadline: 'Nov 01' },
                  ].map((item, i) => (
                    <div key={i} className={styles.internCard}>
                      <div>
                        <h4 className={styles.internCompany}>{item.company}</h4>
                        <p className={styles.internRole}>{item.role}</p>
                      </div>
                      <div className={styles.internMeta}>
                        <span className={styles.internStipend}>{item.stipend}</span>
                        <span className={styles.internDeadline}>Deadline: {item.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Upcoming Drives</h3>
            <div className={styles.drivesList}>
              {PLACEMENT_DATA.upcomingDrives.map((d, i) => (
                <div key={i} className={styles.driveItem}>
                  <div className={styles.driveCompany}>{d.company}</div>
                  <div className={styles.driveMeta}>
                    <span className={styles.driveDate}>
                      <Calendar size={12} /> {d.date}
                    </span>
                    <span className={styles.driveRole}>{d.role}</span>
                  </div>
                  <span className={styles.driveEligible}>{d.eligible}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Preparation Resources</h3>
            <div className={styles.resourcesList}>
              {PLACEMENT_DATA.resources.map((r, i) => (
                <a key={i} href="#" className={styles.resourceItem}>
                  {r.type === 'PDF' && <FileText size={16} />}
                  {r.type === 'Video' && <Video size={16} />}
                  {r.type === 'Online' && <Globe size={16} />}
                  <span>{r.title}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
