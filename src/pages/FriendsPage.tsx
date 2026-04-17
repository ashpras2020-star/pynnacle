import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Users, Bell, Activity, Trash2, Gamepad2, Play, X } from 'lucide-react';
import { useFriendsStore } from '@store/useFriendsStore';
import { useLiveQuizStore } from '@store/useLiveQuizStore';
import { useUserStore } from '@store/useUserStore';
import { FriendCard } from '@components/friends/FriendCard';
import { FriendRequestCard } from '@components/friends/FriendRequestCard';
import { AddFriendModal } from '@components/friends/AddFriendModal';
import { ActivityFeedItemCard } from '@components/friends/ActivityFeedItem';
import { FriendProfileModal } from '@components/friends/FriendProfileModal';
import { CreateQuizModal } from '@components/liveQuiz/CreateQuizModal';
import { liveQuizService } from '@services/liveQuizService';
import type { FriendProfile } from '@services/friendsService';
import toast from 'react-hot-toast';

type Tab = 'friends' | 'requests' | 'activity';

export function FriendsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('friends');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [viewingFriend, setViewingFriend] = useState<FriendProfile | null>(null);

  const friends = useFriendsStore((s) => s.friends);
  const incomingRequests = useFriendsStore((s) => s.incomingRequests);
  const sentRequests = useFriendsStore((s) => s.sentRequests);
  const isLoading = useFriendsStore((s) => s.isLoading);
  const acceptRequest = useFriendsStore((s) => s.acceptRequest);
  const rejectRequest = useFriendsStore((s) => s.rejectRequest);
  const removeFriend = useFriendsStore((s) => s.removeFriend);
  const activityFeed = useFriendsStore((s) => s.activityFeed);
  const feedLoading = useFriendsStore((s) => s.feedLoading);
  const loadActivityFeed = useFriendsStore((s) => s.loadActivityFeed);
  const giftXP = useFriendsStore((s) => s.giftXP);
  const clearActivityFeed = useFriendsStore((s) => s.clearActivityFeed);
  const quizInvites = useFriendsStore((s) => s.quizInvites);
  const loadQuizInvites = useFriendsStore((s) => s.loadQuizInvites);
  const joinGame = useLiveQuizStore((s) => s.joinGame);
  const userId = useUserStore((s) => s.user?.uid);

  const handleJoinQuiz = async (gameId: string) => {
    try {
      if (!userId) return;
      await liveQuizService.acceptInvite(gameId, userId);
      await joinGame(gameId);
      navigate(`/quiz/lobby/${gameId}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to join quiz');
    }
  };

  const handleDeclineQuiz = async (gameId: string) => {
    try {
      if (!userId) return;
      await liveQuizService.declineInvite(gameId, userId);
      await loadQuizInvites();
      toast.success('Invite declined');
    } catch (err: any) {
      toast.error(err.message || 'Failed to decline');
    }
  };

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast.success('Friend request accepted!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to accept request');
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await rejectRequest(requestId);
      toast.success('Request removed');
    } catch (err: any) {
      toast.error(err.message || 'Failed to reject request');
    }
  };

  const handleRemove = async (friendId: string) => {
    try {
      await removeFriend(friendId);
      toast.success('Friend removed');
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove friend');
    }
  };

  const handleGiftXP = async (friendId: string, amount: number) => {
    await giftXP(friendId, amount);
    toast.success(`Sent ${amount} XP!`);
  };

  const handleActivityTab = () => {
    setActiveTab('activity');
    loadActivityFeed();
  };

  const requestCount = incomingRequests.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Friends</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuizModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="text-sm font-medium">Live Quiz</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Friend</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Quiz Invites */}
        {quizInvites.length > 0 && (
          <div className="space-y-2 mb-4">
            {quizInvites.map((invite) => (
              <div
                key={invite.gameId}
                className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">
                    {invite.hostName} invited you to a quiz!
                  </p>
                  <p className="text-xs text-gray-500">
                    Modules 1–{invite.maxModule}
                  </p>
                </div>
                <button
                  onClick={() => handleJoinQuiz(invite.gameId)}
                  className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" />
                  Join
                </button>
                <button
                  onClick={() => handleDeclineQuiz(invite.gameId)}
                  className="p-1.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'friends'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-4 h-4" />
            Friends ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors relative ${
              activeTab === 'requests'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4" />
            Requests
            {requestCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {requestCount}
              </span>
            )}
          </button>
          <button
            onClick={handleActivityTab}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Activity
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-gray-500 py-12">Loading...</div>
        )}

        {/* Friends tab */}
        {!isLoading && activeTab === 'friends' && (
          <div className="space-y-3">
            {friends.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No friends yet</p>
                <p className="text-gray-400 text-sm mb-6">
                  Add friends by their email to see their progress
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Your First Friend
                </button>
              </div>
            ) : (
              friends.map((friend) => (
                <FriendCard
                  key={friend.uid}
                  friend={friend}
                  onRemove={handleRemove}
                  onViewProfile={setViewingFriend}
                />
              ))
            )}
          </div>
        )}

        {/* Requests tab */}
        {!isLoading && activeTab === 'requests' && (
          <div className="space-y-6">
            {incomingRequests.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Incoming Requests
                </h3>
                <div className="space-y-3">
                  {incomingRequests.map((req) => (
                    <FriendRequestCard
                      key={req.id}
                      request={req}
                      type="incoming"
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              </div>
            )}

            {sentRequests.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Sent Requests
                </h3>
                <div className="space-y-3">
                  {sentRequests.map((req) => (
                    <FriendRequestCard
                      key={req.id}
                      request={req}
                      type="sent"
                    />
                  ))}
                </div>
              </div>
            )}

            {incomingRequests.length === 0 && sentRequests.length === 0 && (
              <div className="text-center py-16">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No pending requests</p>
              </div>
            )}
          </div>
        )}

        {/* Activity tab */}
        {!isLoading && activeTab === 'activity' && (
          <div>
            {feedLoading && (
              <div className="text-center text-gray-500 py-12">Loading activity...</div>
            )}

            {!feedLoading && activityFeed.length === 0 && (
              <div className="text-center py-16">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No recent activity</p>
                <p className="text-gray-400 text-sm">
                  When your friends complete lessons or hit milestones, it will show up here
                </p>
              </div>
            )}

            {!feedLoading && activityFeed.length > 0 && (
              <>
                <div className="flex justify-end mb-3">
                  <button
                    onClick={async () => {
                      await clearActivityFeed();
                      toast.success('Activity feed cleared');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 px-4">
                  {activityFeed.map((item) => (
                    <ActivityFeedItemCard key={`${item.userId}-${item.id}`} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && <AddFriendModal onClose={() => setShowAddModal(false)} />}
      {showQuizModal && <CreateQuizModal onClose={() => setShowQuizModal(false)} />}
      {viewingFriend && (
        <FriendProfileModal
          friend={viewingFriend}
          onGiftXP={handleGiftXP}
          onClose={() => setViewingFriend(null)}
        />
      )}
    </div>
  );
}
