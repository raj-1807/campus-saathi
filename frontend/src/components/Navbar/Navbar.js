'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Home,
  MessageCircle,
  Search,
  Calendar,
  Menu,
  X,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Navbar.module.css';

const iconMap = {
  Home,
  MessageCircle,
  Search,
  Calendar,
};

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={styles.navbar} style={scrolled ? { boxShadow: 'var(--shadow-md)' } : {}}>
        <div className={styles.navInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <GraduationCap size={22} />
            </span>
            <span className={styles.logoText}>
              Campus <span className={styles.logoHighlight}>Saathi</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
                  >
                    {Icon && <Icon className={styles.navLinkIcon} />}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className={styles.navActions}>
            {mounted && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
            <button
              className={styles.menuButton}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`${styles.mobileDrawerOverlay} ${mobileOpen ? styles.mobileDrawerOverlayVisible : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}>
        <button
          className={styles.mobileDrawerClose}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
        <ul className={styles.mobileNavLinks}>
          {NAV_LINKS.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {Icon && <Icon size={20} />}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {mounted && (
          <div style={{ padding: '0 var(--space-4)' }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        )}
      </div>
    </>
  );
}
