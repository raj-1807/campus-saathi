'use client';

import { User, Bell, Globe, Accessibility, ChevronDown } from 'lucide-react';
import { ADMIN_DATA } from '@/utils/constants';
import styles from './admin.module.css';

const CATEGORY_COLORS = {
  Scholarships: 'hsl(224, 76%, 48%)',
  Placements: 'hsl(145, 63%, 42%)',
  Admissions: 'hsl(38, 92%, 50%)',
  Complaints: 'hsl(0, 72%, 51%)',
  Services: 'hsl(280, 70%, 55%)',
};

export default function AdminPage() {
  return (
    <div className={styles.adminPage}>
      {/* Admin Navbar */}
      <nav className={styles.adminNav}>
        <div className={styles.adminNavInner}>
          <div className={styles.adminLogo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
              <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className={styles.adminLogoText}>Campus Saathi Portal</div>
              <div className={styles.adminLogoSub}>ADMIN CONTROL</div>
            </div>
          </div>
          <div className={styles.adminBadge}>
            <span className={styles.adminBadgeDot} />
            Admin Dashboard Active
          </div>
          <div className={styles.adminNavActions}>
            <div className={styles.langToggle}>
              <span className={styles.langActive}>EN</span>|<span>HI</span>
            </div>
            <button className={styles.navActionBtn}><Accessibility size={18} /></button>
            <button className={styles.navActionBtn}><Bell size={18} /></button>
            <button className={styles.avatarBtn}>
              <div className={styles.avatar}><User size={16} /></div>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </nav>

      <div className={styles.adminContent}>
        <div className={styles.breadcrumb}>Admin Portal &gt; Dashboard</div>
        <h1 className={styles.pageTitle}>Admin Intelligence Dashboard</h1>

        {/* KPI Stats */}
        <div className={styles.kpiGrid}>
          {ADMIN_DATA.kpis.map((kpi, i) => (
            <div key={i} className={styles.kpiCard}>
              <div className={styles.kpiLabel}>{kpi.label}</div>
              <div className={styles.kpiRow}>
                <div className={styles.kpiValue}>{kpi.value}</div>
                {kpi.change && (
                  <span className={`${styles.kpiBadge} ${styles[`badge_${kpi.changeColor}`]}`}>
                    {kpi.change}
                  </span>
                )}
                {kpi.badge && (
                  <span className={`${styles.kpiBadge} ${styles[`badge_${kpi.badgeColor}`]}`}>
                    {kpi.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.mainGrid}>
          {/* Left column */}
          <div className={styles.leftCol}>
            {/* Chart placeholder */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Query Volume Trends (Last 7 Days)</h3>
              <div className={styles.chartArea}>
                <div className={styles.chartYAxis}>
                  <span>1.5k</span><span>1.0k</span><span>500</span><span>0</span>
                </div>
                <div className={styles.chartBars}>
                  {[700, 1100, 900, 1300, 1400, 1200, 800].map((val, i) => (
                    <div key={i} className={styles.chartBarWrap}>
                      <div className={styles.chartBar} style={{ height: `${(val / 1500) * 100}%` }} />
                      <span className={styles.chartLabel}>Oct {String(i + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Queries */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Top Queries This Week</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Query</th>
                    <th>Category</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {ADMIN_DATA.topQueries.map((q) => (
                    <tr key={q.rank}>
                      <td>{q.rank}</td>
                      <td>{q.query}</td>
                      <td>
                        <span
                          className={styles.categoryTag}
                          style={{ background: `${CATEGORY_COLORS[q.category] || 'var(--primary)'}18`, color: CATEGORY_COLORS[q.category] || 'var(--primary)' }}
                        >
                          {q.category}
                        </span>
                      </td>
                      <td className={styles.countCol}>{q.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className={styles.rightCol}>
            {/* Module Usage */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Module Usage Breakdown</h3>
              <div className={styles.donutArea}>
                <div className={styles.donutPlaceholder}>
                  <div className={styles.donutCenter}>RAG</div>
                </div>
                <div className={styles.donutLegend}>
                  {ADMIN_DATA.moduleUsage.map((m, i) => (
                    <div key={i} className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ background: m.color }} />
                      <span>{m.module} ({m.percent}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Complaints */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Complaints Requiring Attention</h3>
              <div className={styles.complaintsList}>
                {ADMIN_DATA.complaints.map((c, i) => (
                  <div key={i} className={styles.complaintItem}>
                    <div className={styles.complaintHeader}>
                      <span className={styles.complaintId}>{c.id}</span>
                      <span className={styles.complaintTime}>{c.time}</span>
                    </div>
                    <p className={styles.complaintTitle}>{c.title}</p>
                    <div className={styles.complaintFooter}>
                      <span className={`${styles.severityBadge} ${styles[`severity_${c.severity.toLowerCase()}`]}`}>
                        {c.severity}
                      </span>
                      <a href="#" className={styles.assignLink}>Assign &gt;</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusCard}>
            <div className={styles.statusLabel}>RAG Pipeline Status</div>
            <div className={styles.statusValue}>
              <span className={styles.statusDotGreen} /> Operational
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusLabel}>Knowledge Base Sync</div>
            <div className={styles.statusValue}>Today, 04:00 AM</div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusLabel}>Model Accuracy Score</div>
            <div className={styles.statusRow}>
              <div className={styles.accuracyBar}>
                <div className={styles.accuracyFill} style={{ width: '98.2%' }} />
              </div>
              <span className={styles.accuracyValue}>98.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
