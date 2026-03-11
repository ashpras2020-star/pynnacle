import { useState } from 'react';

interface CodeEditorPanelProps {
  onExecute: (code: string) => void;
  codeHistory: string[];
}

export function CodeEditorPanel({ onExecute, codeHistory }: CodeEditorPanelProps) {
  const [code, setCode] = useState('# Write your Python code here\n# Use list methods to cook the recipe!\n');
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const allIngredients = [
    '🍅', '🧀', '🥬', '🍞', '🥩', '🥒', '🍓', '🍌',
    '🥤', '🌮', '🐟', '🥑', '🍚', '🍝', '🌿', '🥓'
  ];

  const copyToClipboard = async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      setTimeout(() => setCopiedEmoji(null), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="lc-panel rounded-2xl p-6">
      <h2 className="text-xl font-bold text-orange-800 mb-4">📝 Recipe Code</h2>

      {/* Available Ingredients */}
      <div className="lc-ref-panel rounded-xl p-3 mb-4">
        <div className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider">Ingredients (click to copy)</div>
        <div className="flex flex-wrap gap-1 justify-center">
          {allIngredients.map((item) => (
            <button
              key={item}
              onClick={() => copyToClipboard(item)}
              className={`text-xl hover:scale-110 transition-all cursor-pointer px-1.5 py-0.5 rounded-lg ${
                copiedEmoji === item ? 'bg-emerald-200 scale-110' : 'hover:bg-amber-100'
              }`}
              title={`Click to copy ${item}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="text-xs text-amber-600 mt-2 text-center">
          {copiedEmoji ? `✅ Copied ${copiedEmoji}!` : 'Click any ingredient to copy'}
        </div>
      </div>

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-44 px-4 py-3 font-mono text-sm lc-chalkboard text-green-400 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Write Python list operations..."
        spellCheck={false}
      />

      {/* Execute Button */}
      <button
        onClick={() => {
          onExecute(code);
          setCode('# Write your next operation\n');
        }}
        className="w-full mt-3 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold rounded-xl shadow-md shadow-orange-500/15 transition-all hover:shadow-lg"
      >
        👨‍🍳 Run Code
      </button>

      {/* Code History */}
      {codeHistory.length > 0 && (
        <div className="mt-4 lc-history-panel rounded-xl p-3 max-h-28 overflow-y-auto">
          <div className="text-xs font-bold text-purple-700 mb-2 uppercase tracking-wider">History</div>
          {codeHistory.map((historyCode, index) => (
            <div key={index} className="text-xs font-mono text-purple-600 bg-white/80 p-2 rounded-lg mb-1 border border-purple-100">
              {historyCode.split('\n').filter(line => !line.trim().startsWith('#')).join(' | ')}
            </div>
          ))}
        </div>
      )}

      {/* Syntax Reference */}
      <div className="mt-4 lc-tip-panel rounded-xl p-4">
        <h3 className="font-bold text-emerald-800 mb-2 text-sm">📚 List Methods</h3>
        <div className="text-xs text-emerald-700 space-y-1.5 font-mono">
          <div><code className="bg-white px-2 py-0.5 rounded border border-emerald-200">ingredients.append("🍅")</code> <span className="text-emerald-500">— Add to end</span></div>
          <div><code className="bg-white px-2 py-0.5 rounded border border-emerald-200">ingredients.insert(0, "🥬")</code> <span className="text-emerald-500">— Add at index</span></div>
          <div><code className="bg-white px-2 py-0.5 rounded border border-emerald-200">ingredients.remove("🧀")</code> <span className="text-emerald-500">— Remove item</span></div>
          <div><code className="bg-white px-2 py-0.5 rounded border border-emerald-200">ingredients.pop()</code> <span className="text-emerald-500">— Remove last</span></div>
          <div><code className="bg-white px-2 py-0.5 rounded border border-emerald-200">ingredients.clear()</code> <span className="text-emerald-500">— Remove all</span></div>
        </div>
      </div>
    </div>
  );
}
