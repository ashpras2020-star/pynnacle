import { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { FriendRequest } from '@services/friendsService';

interface FriendRequestCardProps {
  request: FriendRequest;
  type: 'incoming' | 'sent';
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
}

export function FriendRequestCard({ request, type, onAccept, onReject }: FriendRequestCardProps) {
  const [isActing, setIsActing] = useState(false);
  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  const handleAccept = async () => {
    setIsActing(true);
    try {
      await onAccept?.(request.id);
    } finally {
      setIsActing(false);
    }
  };

  const handleReject = async () => {
    setIsActing(true);
    try {
      await onReject?.(request.id);
    } finally {
      setIsActing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
      <img
        src={request.fromPhoto || defaultAvatar}
        alt={request.fromName}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 truncate">{request.fromName}</div>
        <div className="text-sm text-gray-500 truncate">
          {type === 'incoming' ? request.fromEmail : request.toEmail}
        </div>
      </div>

      {type === 'incoming' ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleAccept}
            disabled={isActing}
            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
            title="Accept"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleReject}
            disabled={isActing}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
            title="Reject"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <span className="text-sm text-gray-400 italic">Pending</span>
      )}
    </div>
  );
}
