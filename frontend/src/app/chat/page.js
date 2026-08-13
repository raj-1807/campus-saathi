'use client';

import { useRef, useEffect, useCallback } from 'react';
import { GraduationCap, Sparkles, Trash2, AlertTriangle } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage/ChatMessage';
import ChatInput from '@/components/ChatInput/ChatInput';
import { useChatHistory } from '@/hooks/useChatHistory';
import { SUGGESTED_QUESTIONS, DEMO_RESPONSES } from '@/utils/constants';
import styles from './chat.module.css';

export default function ChatPage() {
  const { messages, isLoading, setIsLoading, addMessage, updateLastMessage, clearHistory } =
    useChatHistory();
  const messagesEndRef = useRef(null);
  const demoIndexRef = useRef(0);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(
    async (text) => {
      // Add user message
      addMessage({ role: 'user', text });
      setIsLoading(true);

      // Add typing indicator
      addMessage({ role: 'ai', text: '', isTyping: true });

      try {
        // Try real API first
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: messages.slice(-10) }),
        });

        if (res.ok) {
          const data = await res.json();
          updateLastMessage({
            text: data.response,
            sources: data.sources || [],
            isTyping: false,
          });
        } else {
          // Fallback to demo mode
          await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
          const demo = DEMO_RESPONSES[demoIndexRef.current % DEMO_RESPONSES.length];
          demoIndexRef.current++;
          updateLastMessage({
            text: demo.text,
            sources: demo.sources,
            isTyping: false,
          });
        }
      } catch {
        // Demo mode fallback
        await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
        const demo = DEMO_RESPONSES[demoIndexRef.current % DEMO_RESPONSES.length];
        demoIndexRef.current++;
        updateLastMessage({
          text: demo.text,
          sources: demo.sources,
          isTyping: false,
        });
      }

      setIsLoading(false);
    },
    [messages, addMessage, updateLastMessage, setIsLoading]
  );

  return (
    <div className={styles.chatPage}>
      {/* Demo Banner */}
      <div className={styles.demoBanner}>
        <AlertTriangle size={14} />
        Demo Mode — Responses are simulated. Connect API keys for real AI answers.
      </div>

      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
          <div className={styles.chatHeaderIcon}>
            <GraduationCap size={22} />
          </div>
          <div>
            <div className={styles.chatHeaderTitle}>Campus Saathi</div>
            <div className={styles.chatHeaderStatus}>
              <span className={styles.chatHeaderDot} />
              Online
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button className={styles.clearBtn} onClick={clearHistory}>
            <Trash2 size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className={styles.messagesArea}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Sparkles size={32} />
            </div>
            <h2 className={styles.emptyTitle}>
              Hi! I'm <span className="gradient-text">Campus Saathi</span>
            </h2>
            <p className={styles.emptyDesc}>
              Ask me anything about your campus — admissions, courses, facilities,
              events, and more. I'm here to help!
            </p>
            <div className={styles.emptyHints}>
              {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                <button
                  key={i}
                  className={styles.emptyHint}
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        disabled={isLoading}
        showSuggestions={messages.length > 0 && messages.length < 4}
      />
    </div>
  );
}
