'use client';

import { useState, useCallback } from 'react';
import {
  Search as SearchIcon,
  LayoutGrid,
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  Calendar,
  FileSearch,
} from 'lucide-react';
import SearchCard, { SearchCardSkeleton } from '@/components/SearchCard/SearchCard';
import { SEARCH_CATEGORIES } from '@/utils/constants';
import styles from './search.module.css';

const categoryIconMap = {
  LayoutGrid,
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  Calendar,
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(
    async (searchQuery) => {
      const q = searchQuery || query;
      if (!q.trim()) return;

      setLoading(true);
      setSearched(true);

      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q, category: activeCategory }),
        });

        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch {
        setResults([]);
      }

      setLoading(false);
    },
    [query, activeCategory]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (searched && query.trim()) {
      // Re-search with new category
      setTimeout(() => handleSearch(), 0);
    }
  };

  return (
    <div className={styles.searchPage}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className="gradient-text">Search</span> Campus Documents
        </h1>
        <p className={styles.subtitle}>
          Find information across campus documents, notices, and resources
        </p>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBarWrap}>
        <div className={styles.searchBar}>
          <SearchIcon size={20} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for admissions, courses, facilities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.searchBtn} onClick={() => handleSearch()}>
            Search
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className={styles.filters}>
        {SEARCH_CATEGORIES.map((cat) => {
          const Icon = categoryIconMap[cat.icon];
          return (
            <button
              key={cat.id}
              className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {Icon && <Icon size={16} />}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className={styles.results}>
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <SearchCardSkeleton key={i} />
            ))}
          </>
        ) : searched ? (
          results.length > 0 ? (
            <>
              <div className={styles.resultsCount}>
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((result, i) => (
                <SearchCard key={result.id} result={result} index={i} />
              ))}
            </>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <FileSearch size={28} />
              </div>
              <h3 className={styles.emptyTitle}>No results found</h3>
              <p className={styles.emptyDesc}>
                Try different keywords or change the category filter
              </p>
            </div>
          )
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <SearchIcon size={28} />
            </div>
            <h3 className={styles.emptyTitle}>Search campus documents</h3>
            <p className={styles.emptyDesc}>
              Enter a query above to search across all campus resources
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
