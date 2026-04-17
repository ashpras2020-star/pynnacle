import { useState } from 'react';
import { X, Gamepad2, Users, Clock, Hash } from 'lucide-react';
import { useLiveQuizStore } from '@store/useLiveQuizStore';
import { useFriendsStore } from '@store/useFriendsStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MODULE_NAMES: Record<number, string> = {
  1: 'Basics & Syntax',
  2: 'Numbers & Math',
  3: 'String Manipulation',
  4: 'Boolean Logic',
  5: 'Control Flow',
  6: 'Collections',
  7: 'Functions',
  8: 'List Comprehensions',
  9: 'Error Handling',
  10: 'File I/O',
};

interface Props {
  onClose: () => void;
}

export function CreateQuizModal({ onClose }: Props) {
  const [maxModule, setMaxModule] = useState(3);
  const [questionCount, setQuestionCount] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(15);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  const createGame = useLiveQuizStore((s) => s.createGame);
  const friends = useFriendsStore((s) => s.friends);
  const navigate = useNavigate();

  const toggleFriend = (uid: string) => {
    setSelectedFriends((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const gameId = await createGame({
        maxModule,
        questionCount,
        timePerQuestion,
        friendIds: selectedFriends,
      });
      toast.success('Quiz created!');
      navigate(`/quiz/lobby/${gameId}`);
      onClose();
    } catch (err: any) {
      console.error('Quiz creation failed:', err);
      toast.error(err.message || 'Failed to create quiz');
    } finally {
      setCreating(false);
    }
  };

  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Create Live Quiz</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {/* Module Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
              <BookIcon />
              Up to Module
            </label>
            <select
              value={maxModule}
              onChange={(e) => setMaxModule(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  Module {m}: {MODULE_NAMES[m]}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Questions from modules 1–{maxModule}
            </p>
          </div>

          {/* Question Count */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
              <Hash className="w-4 h-4 text-gray-400" />
              Number of Questions
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={20}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="flex-1 accent-purple-600"
              />
              <span className="text-sm font-bold text-gray-900 w-8 text-center">{questionCount}</span>
            </div>
          </div>

          {/* Time Per Question */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
              <Clock className="w-4 h-4 text-gray-400" />
              Time Per Question
            </label>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimePerQuestion(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timePerQuestion === t
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>

          {/* Invite Friends */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
              <Users className="w-4 h-4 text-gray-400" />
              Invite Friends ({selectedFriends.length})
            </label>
            {friends.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No friends to invite</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {friends.map((f) => {
                  const selected = selectedFriends.includes(f.uid);
                  return (
                    <button
                      key={f.uid}
                      onClick={() => toggleFriend(f.uid)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        selected ? 'bg-purple-50 border-2 border-purple-400' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <img
                        src={f.photoURL || defaultAvatar}
                        alt={f.displayName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900 flex-1 text-left truncate">
                        {f.displayName}
                      </span>
                      {selected && (
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Create Button */}
        <div className="p-5 pt-3 border-t border-gray-100">
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            {creating ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BookIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
