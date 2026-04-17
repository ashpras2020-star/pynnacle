// Floating chatbot button component

import { useState } from 'react';
import { ChatPanel } from './ChatPanel';

interface ChatbotButtonProps {
  lessonContext?: {
    lessonId: string;
    lessonTitle: string;
    concepts: string[];
    challengePrompt?: string;
  };
}

export function ChatbotButton({ lessonContext }: ChatbotButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 group" style={{background:'linear-gradient(135deg,#ffffff,#c084fc)'}}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <img src={`${import.meta.env.BASE_URL}avatars/avatar-1.png`} alt="Pynnacle" className="w-11 h-11 rounded-full" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask Viper
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </button>

      {/* Chat Panel */}
      <ChatPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lessonContext={lessonContext}
      />
    </>
  );
}
