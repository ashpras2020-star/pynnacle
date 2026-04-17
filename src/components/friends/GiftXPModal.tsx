import { useState } from 'react';
import { X, Gift, Loader2 } from 'lucide-react';
import type { FriendProfile } from '@services/friendsService';

interface GiftXPModalProps {
  friend: FriendProfile;
  availableXP: number;
  onGift: (amount: number) => Promise<void>;
  onClose: () => void;
}

const PRESETS = [10, 25, 50, 100];

export function GiftXPModal({ friend, availableXP, onGift, onClose }: GiftXPModalProps) {
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const numAmount = parseInt(amount) || 0;
  const isValid = numAmount > 0 && numAmount <= availableXP;

  const handleSend = async () => {
    if (!isValid) return;
    setIsSending(true);
    setError('');
    try {
      await onGift(numAmount);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to send XP');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-bold text-gray-900">Gift XP</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Send XP to <span className="font-semibold text-gray-700">{friend.displayName || 'your friend'}</span>
        </p>

        {/* Available balance */}
        <div className="text-sm text-gray-500 mb-3">
          Your available XP: <span className="font-semibold text-purple-600">{availableXP.toLocaleString()}</span>
        </div>

        {/* Preset buttons */}
        <div className="flex gap-2 mb-3">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(String(preset))}
              disabled={preset > availableXP}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                amount === String(preset)
                  ? 'bg-purple-600 text-white'
                  : preset > availableXP
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setError(''); }}
          placeholder="Custom amount"
          min={1}
          max={availableXP}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none mb-3"
        />

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!isValid || isSending}
          className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
            isValid && !isSending
              ? 'bg-pink-500 text-white hover:bg-pink-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Gift className="w-4 h-4" />
          )}
          {isSending ? 'Sending...' : `Send ${numAmount || 0} XP`}
        </button>
      </div>
    </div>
  );
}
