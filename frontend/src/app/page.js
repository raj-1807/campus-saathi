'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  MessageSquareWarning,
  BookOpen,
  Calendar,
  Mic,
  Zap,
} from 'lucide-react';
import { ANNOUNCEMENTS } from '@/utils/constants';
import styles from './home.module.css';

const QUICK_ACCESS = [
  { title: 'Admission Information', desc: 'Eligibility, cutoffs, document checklist & more', icon: GraduationCap, href: '/admission', color: 'hsl(224, 76%, 48%)' },
  { title: 'Training & Placement', desc: 'Company visits, packages, preparation resources', icon: Briefcase, href: '/placement', color: 'hsl(145, 63%, 42%)' },
  { title: 'Complaints & Redressal', desc: 'File, track & resolve campus grievances', icon: MessageSquareWarning, href: '/complaints', color: 'hsl(38, 92%, 50%)' },
  { title: 'Student Services', desc: 'Fee payment, hostel, library, transport & ID', icon: BookOpen, href: '/services', color: 'hsl(280, 70%, 55%)' },
];

const SUGGESTIONS = [
  'How do I apply for admission?',
  'What are the placement stats?',
  'Upcoming campus events',
  'Scholarship eligibility',
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (q) => {
    const searchText = q || query;
    if (searchText.trim()) {
      router.push(`/chat?q=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Zap size={14} />
            RAG-POWERED AI PORTAL ACTIVE
          </div>

          <h1 className={styles.title}>
            Campus <span className={styles.titleHighlight}>Saathi</span> — Your AI Campus Companion
          </h1>

          <p className={styles.subtitle}>
            Get instant answers about admissions, placements, events, and campus services. 
            Powered by AI with real-time campus knowledge.
          </p>

          {/* Search Bar */}
          <form className={styles.searchBar} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Sparkles size={18} className={styles.sparkleIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Ask about admissions, placements, events, or any campus query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" className={styles.micBtn} aria-label="Voice input">
              <Mic size={18} />
            </button>
            <button type="submit" className={styles.submitBtn} aria-label="Search">
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Suggestion Chips */}
          <div className={styles.suggestions}>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                className={styles.suggestionChip}
                onClick={() => handleSearch(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Services */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Quick Access Services</h2>
          <div className={styles.servicesGrid}>
            {QUICK_ACCESS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={i} className={styles.serviceCard}>
                  <div className={styles.serviceIconWrap} style={{ background: `${item.color}12`, color: item.color }}>
                    <Icon size={24} />
                  </div>
                  <div className={styles.serviceText}>
                    <h3 className={styles.serviceTitle}>{item.title}</h3>
                    <p className={styles.serviceDesc}>{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className={styles.serviceArrow} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Announcements */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Announcements</h2>
            <Link href="/events" className={styles.viewAll}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className={styles.announcementsGrid}>
            {ANNOUNCEMENTS.map((item, i) => (
              <div key={i} className={styles.announcementCard}>
                <div className={styles.announcementDate}>
                  <Calendar size={14} />
                  {item.date}
                </div>
                <h3 className={styles.announcementTitle}>{item.title}</h3>
                <p className={styles.announcementDesc}>{item.desc}</p>
                <span className={styles.announcementCategory}>{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
