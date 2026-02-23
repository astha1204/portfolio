import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from './types';
import { sendChatMessage } from './api';
import { SUGGESTED_QUESTIONS } from './data';
import './Chat.css';

let sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const TypingIndicator: React.FC = () => (
  <div className="chat__typing">
    <span /><span /><span />
  </div>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  const formatContent = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .split('\n')
      .map((line, i) => `<p key="${i}">${line || '&nbsp;'}</p>`)
      .join('');

  return (
    <div className={`message ${isUser ? 'message--user' : 'message--ai'}`}>
      {!isUser && <div className="message__avatar"><span>AI</span></div>}
      <div className="message__bubble">
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="message__content" dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
        )}
        <span className="message__time">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Aastha's AI assistant. Ask me anything about her experience at DRDO or the Indian Navy, her projects, technical skills, or how to reach her.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = useCallback(async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;
    setInput('');
    setError(null);
    setIsExpanded(true);
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    try {
      const response = await sendChatMessage(content, sessionId);
      setMessages(prev => [...prev, {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      }]);
    } catch {
      setError('Failed to get response. Please check the backend is running on port 8000.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <section className="chat-section section" id="contact">
      <div className="container">
        <div className="section-header section-header--visible">
          <span className="section-tag">Ask Anything</span>
          <h2 className="section-title">Chat with my AI</h2>
          <p className="section-subtitle">
            Powered by OpenRouter · Ask about my internships, projects, skills, or background.
          </p>
        </div>

        <div className={`chat-widget ${isExpanded ? 'chat-widget--expanded' : ''}`}>
          <div className="chat-widget__header">
            <div className="chat-widget__identity">
              <div className="chat-widget__avatar">
                <span>AA</span>
                <div className="chat-widget__status" />
              </div>
              <div>
                <p className="chat-widget__name">Aastha's AI Assistant</p>
                <p className="chat-widget__subtitle">Resume · Experience · Contact</p>
              </div>
            </div>
            <div className="chat-widget__model">
              <span className="chat-widget__model-badge">Mistral 7B</span>
            </div>
          </div>

          <div className="chat-widget__messages">
            {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            {isLoading && (
              <div className="message message--ai">
                <div className="message__avatar"><span>AI</span></div>
                <div className="message__bubble"><TypingIndicator /></div>
              </div>
            )}
            {error && (
              <div className="chat-widget__error">
                <span>⚠</span> {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="chat-widget__suggestions">
              <p className="chat-widget__suggestions-label">Try asking:</p>
              <div className="chat-widget__suggestions-grid">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    className="chat-widget__suggestion"
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat-widget__input-area">
            <div className="chat-widget__input-wrapper">
              <textarea
                ref={inputRef}
                className="chat-widget__input"
                placeholder="Ask about Aastha's experience, projects, skills..."
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isLoading}
              />
              <button
                className={`chat-widget__send ${input.trim() ? 'chat-widget__send--active' : ''}`}
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="chat-widget__hint">Press Enter to send · Shift+Enter for newline</p>
          </div>
        </div>

        <div className="contact-row">
          {[
            { icon: '✉', label: 'Email', value: 'asthaarora1204@gmail.com', href: 'mailto:asthaarora1204@gmail.com' },
            { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/aastha-arora', href: 'https://linkedin.com/in/aastha-arora' },
            { icon: '⬡', label: 'GitHub', value: 'github.com/aastha-arora', href: 'https://github.com/aastha-arora' },
            { icon: '📍', label: 'Location', value: 'New Delhi, India', href: null },
          ].map(({ icon, label, value, href }) => (
            <div key={label} className="contact-item">
              <span className="contact-item__icon">{icon}</span>
              <div>
                <span className="contact-item__label">{label}</span>
                {href
                  ? <a href={href} className="contact-item__value" target="_blank" rel="noreferrer">{value}</a>
                  : <span className="contact-item__value">{value}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chat;