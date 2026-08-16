'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { Sparkles, Plus, ThumbsUp, ThumbsDown, Paperclip, Mic, ArrowRight, FileText } from 'lucide-react';
import { useChatHistory } from '@/hooks/useChatHistory';
import { SUGGESTED_QUESTIONS, DEMO_RESPONSES, CHAT_HISTORY } from '@/utils/constants';
import styles from './chat.module.css';

export default function ChatPage() {
  const { messages, isLoading, setIsLoading, addMessage, updateLastMessage, clearHistory } =
    useChatHistory();
  const messagesEndRef = useRef(null);
  const demoIndexRef = useRef(0);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(
    async (text) => {
      const msgText = text || inputText;
      if (!msgText.trim()) return;
      setInputText('');

      addMessage({ role: 'user', text: msgText });
      setIsLoading(true);
      addMessage({ role: 'ai', text: '', isTyping: true });

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msgText, history: messages.slice(-10) }),
        });

        if (res.ok) {
          const data = await res.json();
          updateLastMessage({ text: data.response, sources: data.sources || [], isTyping: false });
        } else {
          await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
          const demo = DEMO_RESPONSES[demoIndexRef.current % DEMO_RESPONSES.length];
          demoIndexRef.current++;
          updateLastMessage({ text: demo.text, sources: demo.sources, isTyping: false });
        }
      } catch {
        await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
        const demo = DEMO_RESPONSES[demoIndexRef.current % DEMO_RESPONSES.length];
        demoIndexRef.current++;
        updateLastMessage({ text: demo.text, sources: demo.sources, isTyping: false });
      }

      setIsLoading(false);
    },
    [messages, inputText, addMessage, updateLastMessage, setIsLoading]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatLayout}>
      {/* Left Sidebar */}
      <aside className={styles.chatSidebar}>
        <button className={styles.newChatBtn} onClick={clearHistory}>
          <Plus size={16} /> New Chat
        </button>
        <div className={styles.historyList}>
          {CHAT_HISTORY.map((group, gi) => (
            <div key={gi}>
              <div className={styles.historyGroup}>{group.group}</div>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.historyItem} ${item.active ? styles.historyItemActive : ''}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat */}
      <div className={styles.chatMain}>
        <div className={styles.chatHeader}>
          <Sparkles size={18} className={styles.chatHeaderIcon} />
          <h1 className={styles.chatTitle}>Ask Campus Saathi</h1>
        </div>

        {/* Messages */}
        <div className={styles.messagesArea}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Sparkles size={28} />
              </div>
              <h2 className={styles.emptyTitle}>How can I help you today?</h2>
              <p className={styles.emptyDesc}>
                Ask me anything about your campus — admissions, placements, events, and more.
              </p>
              <div className={styles.emptyHints}>
                {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                  <button key={i} className={styles.emptyHint} onClick={() => handleSend(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${styles[`message_${msg.role}`]}`}>
                {msg.role === 'user' ? (
                  <div className={styles.userBubble}>{msg.text}</div>
                ) : msg.isTyping ? (
                  <div className={styles.aiBubble}>
                    <div className={styles.typingDots}>
                      <span /><span /><span />
                    </div>
                  </div>
                ) : (
                  <div className={styles.aiBubble}>
                    <div className={styles.aiText}>{msg.text}</div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className={styles.sources}>
                        <span className={styles.sourcesLabel}>SOURCES</span>
                        <div className={styles.sourceChips}>
                          {msg.sources.map((s, i) => (
                            <span key={i} className={styles.sourceChip}>
                              <FileText size={12} /> {s.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className={styles.aiActions}>
                      <button className={styles.aiActionBtn}><ThumbsUp size={14} /></button>
                      <button className={styles.aiActionBtn}><ThumbsDown size={14} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Follow-up suggestions */}
        {messages.length > 0 && messages.length < 6 && (
          <div className={styles.followUpChips}>
            {['Fee structure', 'Scholarship options', 'Important dates'].map((s, i) => (
              <button key={i} className={styles.followUpChip} onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className={styles.inputBar}>
          <button className={styles.inputAction} aria-label="Attach"><Paperclip size={18} /></button>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Ask Campus Saathi..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button className={styles.inputAction} aria-label="Voice"><Mic size={18} /></button>
          <button className={styles.sendBtn} onClick={() => handleSend()} disabled={isLoading}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
