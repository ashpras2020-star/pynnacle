import { useState } from 'react';
import { X, Search, UserPlus, Loader2 } from 'lucide-react';
import { friendsService } from '@services/friendsService';
import type { PublicProfile } from '@services/friendsService';
import { useFriendsStore } from '@store/useFriendsStore';
import toast from 'react-hot-toast';

interface AddFriendModalProps {
  onClose: () => void;
}

export function AddFriendModal({ onClose }: AddFriendModalProps) {
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [foundUser, setFoundUser] = useState<{ uid: string; profile: PublicProfile } | null>(null);
  const [error, setError] = useState('');
  const sendRequest = useFriendsStore((s) => s.sendRequest);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSearching(true);
    setError('');
    setFoundUser(null);

    try {
      const result = await friendsService.findUserByEmail(email.trim());
      if (result) {
        setFoundUser(result);
      } else {
        setError('No user found with that email');
      }
    } catch (err: any) {
      setError(err.message || 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSendRequest = async () => {
    if (!foundUser) return;

    setIsSending(true);
    setError('');

    try {
      await sendRequest(email.trim());
      toast.success('Friend request sent!');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to send request');
    } finally {
      setIsSending(false);
    }
  };

  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Friend</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email search form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFoundUser(null);
              setError('');
            }}
            placeholder="Enter friend's email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            autoFocus
          />
          <button
            type="submit"
            disabled={isSearching || !email.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-500 mb-4 px-1">{error}</div>
        )}

        {/* Found user preview */}
        {foundUser && (
          <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-4">
            <img
              src={foundUser.profile.photoURL || defaultAvatar}
              alt={foundUser.profile.displayName || 'User'}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">
                {foundUser.profile.displayName || 'Unknown'}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {foundUser.profile.email}
              </div>
            </div>
            <button
              onClick={handleSendRequest}
              disabled={isSending}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">Add</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
