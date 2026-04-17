import { useState } from 'react';
import { X, Pin, Check } from 'lucide-react';
import { ALL_BADGES } from '@data/badges';

interface PinBadgesModalProps {
  earnedBadgeIds: string[];
  currentPinned: string[];
  onSave: (ids: string[]) => void;
  onClose: () => void;
}

export function PinBadgesModal({ earnedBadgeIds, currentPinned, onSave, onClose }: PinBadgesModalProps) {
  const [selected, setSelected] = useState<string[]>(currentPinned.filter((id) => earnedBadgeIds.includes(id)));

  const toggleBadge = (badgeId: string) => {
    setSelected((prev) => {
      if (prev.includes(badgeId)) {
        return prev.filter((id) => id !== badgeId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, badgeId];
    });
  };

  const earnedBadges = ALL_BADGES.filter((b) => earnedBadgeIds.includes(b.id));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Pin className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Pin Badges to Profile</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Select up to 3 badges to showcase on your profile. ({selected.length}/3 selected)
        </p>

        {/* Badge grid */}
        <div className="overflow-y-auto flex-1 -mx-1 px-1">
          {earnedBadges.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No badges earned yet. Keep learning!</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {earnedBadges.map((badge) => {
                const isSelected = selected.includes(badge.id);
                return (
                  <button
                    key={badge.id}
                    onClick={() => toggleBadge(badge.id)}
                    className={`relative rounded-lg p-3 text-center transition-all border-2 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-xl mb-1" style={{background:'linear-gradient(135deg,#8b5cf6,#6d28d9)'}}>
                      <span>{badge.icon}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-700 truncate">{badge.name}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={() => onSave(selected)}
          className="mt-4 w-full py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Save Pinned Badges
        </button>
      </div>
    </div>
  );
}
