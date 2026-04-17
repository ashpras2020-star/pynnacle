// Decorative translucent code lines for dark gradient backgrounds

const CODE_LINES = [
  'def calculate_score(points, combo):',
  '    return points * combo',
  'for i in range(len(questions)):',
  '    if answer == correct:',
  '        score += 100',
  'while timer > 0:',
  '    timer -= 1',
  'print("Well done!")',
  'import random',
  'players = []',
  'def check_answer(a, b):',
  '    return a == b',
  'if score > high_score:',
  '    high_score = score',
  'questions = shuffle(quiz)',
  'for player in players:',
  '    player.score += xp',
  'result = True if correct else False',
  'streak = combo + 1',
  'quiz.next_question()',
  'x = [i**2 for i in range(10)]',
  'name = input("Enter name: ")',
  'print(f"Score: {score}")',
  'answer.lower().strip()',
  'elif lives == 0: game_over()',
];

// Deterministic layout so it looks the same every render
const POSITIONS = CODE_LINES.map((_, i) => ({
  top: ((i * 37 + 7) % 90) + 2,       // 2–92% from top
  left: ((i * 53 + 11) % 80) - 5,     // -5–75% from left
  rotate: ((i * 17) % 30) - 15,       // -15° to +15°
  opacity: 0.04 + (i % 4) * 0.02,     // 0.04–0.10
  size: 11 + (i % 3),                 // 11–13px
}));

export function CodeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {CODE_LINES.map((line, i) => (
        <span
          key={i}
          className="absolute font-mono text-purple-300 whitespace-nowrap"
          style={{
            top: `${POSITIONS[i].top}%`,
            left: `${POSITIONS[i].left}%`,
            transform: `rotate(${POSITIONS[i].rotate}deg)`,
            opacity: POSITIONS[i].opacity,
            fontSize: `${POSITIONS[i].size}px`,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
