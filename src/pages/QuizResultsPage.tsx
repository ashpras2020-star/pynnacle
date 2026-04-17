import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, RotateCcw, Crown, Star } from 'lucide-react';
import { useLiveQuizStore } from '@store/useLiveQuizStore';
import { useUserStore } from '@store/useUserStore';
import { QuizLeaderboard } from '@components/liveQuiz/QuizLeaderboard';

// Simple confetti particle
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
}

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#a855f7', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#ec4899', '#fbbf24'];

    // Create particles
    for (let i = 0; i < 120; i++) {
      particles.current.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.6 + 0.4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let active = false;
      for (const p of particles.current) {
        if (p.y > canvas.height + 20) continue;
        active = true;

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.speedY += 0.05; // gravity

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(p.scale, p.scale);
        ctx.fillStyle = p.color;
        ctx.fillRect(-5, -3, 10, 6);
        ctx.restore();
      }

      if (active) {
        animFrame.current = requestAnimationFrame(animate);
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

export function QuizResultsPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const currentGame = useLiveQuizStore((s) => s.currentGame);
  const startGameListener = useLiveQuizStore((s) => s.startGameListener);
  const stopGameListener = useLiveQuizStore((s) => s.stopGameListener);
  const createGame = useLiveQuizStore((s) => s.createGame);

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (gameId && !currentGame) startGameListener(gameId);
    return () => stopGameListener();
  }, [gameId]);

  // Stagger content appearance
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!currentGame || !user?.uid) {
    return (
      <div className="min-h-screen quiz-dark-bg flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-200 font-medium">Loading results...</p>
        </div>
      </div>
    );
  }

  const isHost = currentGame.hostId === user.uid;
  const isWinner = currentGame.winner === user.uid;
  const winnerParticipant = currentGame.winner
    ? currentGame.participants[currentGame.winner]
    : null;
  const winnerName = winnerParticipant?.displayName || 'Unknown';
  const defaultAvatar = `${import.meta.env.BASE_URL}avatars/avatar-1.png`;

  const handlePlayAgain = async () => {
    const friendIds = Object.keys(currentGame.participants).filter((id) => id !== user.uid);
    const newGameId = await createGame({
      maxModule: currentGame.maxModule,
      questionCount: currentGame.questionCount,
      timePerQuestion: currentGame.timePerQuestion,
      friendIds,
    });
    navigate(`/quiz/lobby/${newGameId}`, { replace: true });
  };

  // Get top 3 for podium
  const sortedScores = Object.entries(currentGame.scores)
    .sort(([, a], [, b]) => b.total - a.total);

  const podium = sortedScores.slice(0, 3).map(([uid, score], i) => ({
    uid,
    score,
    participant: currentGame.participants[uid],
    position: i + 1,
  }));

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = podium.length >= 3
    ? [podium[1], podium[0], podium[2]]
    : podium.length === 2
    ? [podium[1], podium[0]]
    : podium;

  return (
    <div className="min-h-screen quiz-dark-bg px-4 py-6 relative overflow-hidden">
      {/* Confetti for winner */}
      {isWinner && <ConfettiCanvas />}

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ filter: 'blur(64px)', background: 'rgba(168,85,247,0.2)' }} />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none" style={{ filter: 'blur(64px)', background: 'rgba(234,179,8,0.1)' }} />

      <div className="max-w-lg mx-auto relative z-10">
        {/* Winner Banner */}
        <div className={`text-center mb-8 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          {isWinner ? (
            <>
              {/* Winner crown animation */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl animate-bounce" style={{ animationDuration: '2s', background:'linear-gradient(135deg,#facc15,#f59e0b)' }}>
                  <Crown className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -left-1">
                  <Star className="w-5 h-5 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-yellow-300 mb-2">
                You Won!
              </h1>
              <p className="text-purple-300/80">Incredible performance!</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Game Over!</h1>
              {winnerParticipant && (
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={winnerParticipant.photoURL || defaultAvatar}
                    alt={winnerName}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-purple-300/80">
                    <span className="text-yellow-400 font-semibold">{winnerName}</span> wins!
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Podium */}
        {podium.length >= 2 && (
          <div className={`flex items-end justify-center gap-3 mb-8 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {podiumOrder.map((entry) => {
              const heights = { 1: 'h-28', 2: 'h-20', 3: 'h-14' };
              const podiumStyles = {
                1: { background:'rgba(234,179,8,0.25)', borderColor:'rgba(234,179,8,0.4)' },
                2: { background:'rgba(156,163,175,0.15)', borderColor:'rgba(156,163,175,0.3)' },
                3: { background:'rgba(180,120,50,0.15)', borderColor:'rgba(180,120,50,0.3)' },
              };
              const pos = entry.position as 1 | 2 | 3;
              const isEntryMe = entry.uid === user.uid;

              return (
                <div key={entry.uid} className="flex flex-col items-center" style={{ width: pos === 1 ? '35%' : '27%' }}>
                  <img
                    src={entry.participant?.photoURL || defaultAvatar}
                    alt={entry.participant?.displayName || 'Player'}
                    className={`rounded-full object-cover mb-2 ring-2 ${
                      pos === 1
                        ? 'w-14 h-14 ring-yellow-400'
                        : 'w-11 h-11 ring-white/20'
                    }`}
                  />
                  <p className={`text-xs font-bold truncate max-w-full mb-1 ${
                    isEntryMe ? 'text-purple-300' : 'text-white/80'
                  }`}>
                    {entry.participant?.displayName || '?'}
                  </p>
                  <p className={`text-xs font-medium mb-1 ${
                    pos === 1 ? 'text-yellow-400' : 'text-white/50'
                  }`}>
                    {entry.score.total.toLocaleString()}
                  </p>
                  <div className={`w-full ${heights[pos]} border border-b-0 rounded-t-xl flex items-start justify-center pt-2`} style={podiumStyles[pos]}>
                    <span className="text-lg font-bold text-white/60">
                      {pos === 1 ? (
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      ) : (
                        `${pos}`
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full Leaderboard */}
        <div className={`mb-8 transition-all duration-700 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
            Final Standings
          </p>
          <QuizLeaderboard
            participants={currentGame.participants}
            scores={currentGame.scores}
            currentUserId={user.uid}
            questionCount={currentGame.questionCount}
          />
        </div>

        {/* Actions */}
        <div className={`space-y-3 transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {isHost && (
            <button
              onClick={handlePlayAgain}
              className="w-full py-3.5 btn-purple rounded-xl font-semibold text-lg transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          )}
          <button
            onClick={() => {
              stopGameListener();
              navigate('/friends');
            }}
            className="w-full py-3.5 bg-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/15 transition-all border border-white/10 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Friends
          </button>
        </div>
      </div>
    </div>
  );
}
