'use client';

import { useState } from 'react';
import { GraduationCap, User, Copy, Check, FileText } from 'lucide-react';
import styles from './ChatMessage.module.css';

function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Simple markdown-like rendering (bold, lists, headings)
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let listType = null;

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === 'ol') {
        elements.push(<ol key={`ol-${elements.length}`}>{listItems}</ol>);
      } else {
        elements.push(<ul key={`ul-${elements.length}`}>{listItems}</ul>);
      }
      listItems = [];
      listType = null;
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} dangerouslySetInnerHTML={{ __html: inlineMd(trimmed.slice(4)) }} />
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} dangerouslySetInnerHTML={{ __html: inlineMd(trimmed.slice(3)) }} />
      );
      return;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      listType = listType || 'ol';
      listItems.push(
        <li key={i} dangerouslySetInnerHTML={{ __html: inlineMd(olMatch[1]) }} />
      );
      return;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listType = listType || 'ul';
      listItems.push(
        <li key={i} dangerouslySetInnerHTML={{ __html: inlineMd(trimmed.slice(2)) }} />
      );
      return;
    }

    flushList();
    elements.push(
      <p key={i} dangerouslySetInnerHTML={{ __html: inlineMd(trimmed) }} />
    );
  });

  flushList();
  return elements;
}

function inlineMd(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isTyping = message.isTyping;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      /* ignore */
    }
  };

  return (
    <div className={`${styles.message} ${isUser ? styles.messageUser : styles.messageAi}`}>
      {/* Avatar */}
      <div className={`${styles.avatar} ${isUser ? styles.avatarUser : styles.avatarAi}`}>
        {isUser ? <User size={18} /> : <GraduationCap size={18} />}
      </div>

      {/* Content */}
      <div>
        <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAi}`}>
          {isTyping ? (
            <div className={styles.typing}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
          ) : isUser ? (
            message.text
          ) : (
            <>
              {renderMarkdown(message.text)}
              {message.sources && message.sources.length > 0 && (
                <div className={styles.sources}>
                  <div className={styles.sourcesLabel}>
                    <FileText size={12} />
                    Sources
                  </div>
                  <div className={styles.sourcesList}>
                    {message.sources.map((src, i) => (
                      <span key={i} className={styles.sourceTag}>
                        {src.title}
                        <span className={styles.sourceRelevance}>
                          {Math.round(src.relevance * 100)}%
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Meta */}
        {!isTyping && (
          <div className={`${styles.meta} ${isUser ? styles.metaUser : ''}`}>
            <span className={styles.timestamp}>{formatTime(message.timestamp)}</span>
            {!isUser && (
              <button
                className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                onClick={handleCopy}
                title="Copy response"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
