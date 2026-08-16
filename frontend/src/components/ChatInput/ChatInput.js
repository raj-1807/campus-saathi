'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { SUGGESTED_QUESTIONS } from '@/utils/constants';
import styles from './ChatInput.module.css';

export default function ChatInput({ onSend, disabled, showSuggestions }) {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('en-US');
  const textareaRef = useRef(null);

  const handleVoiceResult = useCallback((transcript) => {
    setText((prev) => (prev ? prev + ' ' + transcript : transcript));
  }, []);

  const { isListening, isSupported, toggleListening } = useVoiceInput({
    onResult: handleVoiceResult,
    language: lang,
  });

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (q) => {
    onSend(q);
  };

  return (
    <div className={styles.inputWrap}>
      {/* Suggestions */}
      {showSuggestions && (
        <div className={styles.suggestions}>
          {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
            <button
              key={i}
              className={styles.suggestion}
              onClick={() => handleSuggestion(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Row */}
      <div className={styles.inputRow}>
        {/* Voice */}
        {isSupported && (
          <button
            className={`${styles.voiceBtn} ${isListening ? styles.voiceBtnActive : ''}`}
            onClick={toggleListening}
            title={isListening ? 'Stop recording' : 'Voice input'}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        )}

        {/* Language toggle */}
        {isSupported && (
          <button
            className={`${styles.langBtn} ${lang === 'hi-IN' ? styles.langBtnActive : ''}`}
            onClick={() => setLang((l) => (l === 'en-US' ? 'hi-IN' : 'en-US'))}
            title={lang === 'en-US' ? 'Switch to Hindi' : 'Switch to English'}
          >
            {lang === 'en-US' ? 'EN' : 'हि'}
          </button>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about campus..."
          rows={1}
          disabled={disabled}
        />

        {/* Send */}
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          title="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
