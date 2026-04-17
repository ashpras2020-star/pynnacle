// Chat panel component - the main chat interface

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { sendChatMessage } from '@services/chatbotService';

const DAILY_LIMIT = 5;
const STORAGE_KEY = 'chatbot_usage';

// Words/phrases that are blocked
const BLOCKED_PATTERNS = [
  // Sexual / explicit
  /\bsex\b/i, /\bporn\b/i, /\bnude\b/i, /\bnaked\b/i, /\bexplicit\b/i, /\bnsfw\b/i,
  // Violence / self-harm
  /\bkill\b/i, /\bmurder\b/i, /\bsuicid/i, /\bself.?harm\b/i, /\bshoot\b/i, /\bbomb\b/i,
  // Hate / slurs
  /\bn.?word\b/i, /\bslur\b/i,
  // Drug / illegal
  /\bdrug\b/i, /\bweed\b/i, /\bcocaine\b/i, /\bheroin\b/i,
  // Asking about real people (non-Python topics)
  /who is (donald trump|joe biden|elon musk|kanye|celebrities?)/i,
  /tell me about (celebrities?|famous people|politicians?)/i,
  // Trying to jailbreak the AI
  /ignore (previous|all|your) (instructions?|rules?|prompt)/i,
  /pretend (you are|to be|you're)/i,
  /act as (if )?you('re| are)/i,
  /jailbreak/i,
  /dan mode/i,
];

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // "2026-04-07"
}

function getUsageToday(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const { date, count } = JSON.parse(stored);
    return date === getTodayKey() ? count : 0;
  } catch {
    return 0;
  }
}

function incrementUsage() {
  const count = getUsageToday() + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), count }));
  return count;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lessonContext?: {
    lessonId: string;
    lessonTitle: string;
    concepts: string[];
    challengePrompt?: string;
  };
}

export function ChatPanel({ isOpen, onClose, lessonContext }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: lessonContext
        ? `Hi! I'm your Python tutor. I can help you with "${lessonContext.lessonTitle}" or any Python questions you have. What would you like to know?`
        : "Hi! I'm your Python tutor. Ask me anything about Python programming, and I'll be happy to help!",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usedToday, setUsedToday] = useState(getUsageToday);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = DAILY_LIMIT - usedToday;
  const limitReached = remaining <= 0;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setUsedToday(getUsageToday());
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function isBlocked(text: string): boolean {
    return BLOCKED_PATTERNS.some(pattern => pattern.test(text));
  }

  async function handleSend() {
    if (!inputValue.trim() || isLoading || limitReached) return;

    const userMessage = inputValue.trim();

    // Block inappropriate content (doesn't count against daily limit)
    if (isBlocked(userMessage)) {
      setInputValue('');
      setMessages(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: "⚠️ I can only help with Python programming questions. Please keep questions appropriate and on-topic." },
      ]);
      return;
    }

    setInputValue('');
    setIsLoading(true);

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ];
    setMessages(newMessages);

    // Count this as a use
    const newCount = incrementUsage();
    setUsedToday(newCount);

    try {
      const response = await sendChatMessage({
        message: userMessage,
        chatHistory: messages,
        lessonContext,
      });

      setMessages([
        ...newMessages,
        { role: 'assistant', content: response.message },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl border-2 border-purple-200 flex flex-col z-50 animate-scale-in">
      {/* Header */}
      <div className="btn-purple px-4 py-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}avatars/avatar-1.png`} alt="Pynnacle" className="w-8 h-8" />
          <div>
            <h3 className="font-semibold">Viper</h3>
            <p className="text-xs text-purple-100">Ask me anything!</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Daily usage badge */}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            limitReached ? 'bg-red-500 text-white' : remaining <= 2 ? 'bg-yellow-400 text-yellow-900' : 'bg-purple-700 text-purple-100'
          }`}>
            {limitReached ? 'Limit reached' : `${remaining} left today`}
          </span>
          <button
            onClick={onClose}
            className="text-white hover:bg-purple-700 rounded p-1 transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <ChatMessage key={index} role={message.role} content={message.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
        {limitReached ? (
          <div className="text-center py-2 px-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-red-700">Daily limit reached</p>
            <p className="text-xs text-red-500 mt-1">You've used all {DAILY_LIMIT} questions for today. Come back tomorrow!</p>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a Python question..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Press Enter to send · {remaining} of {DAILY_LIMIT} questions remaining today</p>
          </>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}
