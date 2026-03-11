// Individual chat message bubble

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🐍</span>
            <span className="text-xs font-semibold text-purple-600">Python Tutor</span>
          </div>
        )}
        <div className="text-sm whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    </div>
  );
}
