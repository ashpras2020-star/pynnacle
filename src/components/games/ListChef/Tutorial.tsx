export function Tutorial() {
  return (
    <div className="lc-panel rounded-2xl p-6 mb-0">
      <h2 className="text-xl font-bold text-orange-800 mb-4">🎓 How to Play</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { step: '1', icon: '📋', title: 'Read Order', desc: 'See the recipe and required list' },
          { step: '2', icon: '⌨️', title: 'Write Python', desc: 'Code the solution using list methods' },
          { step: '3', icon: '▶️', title: 'Run Code', desc: 'Execute to modify your ingredients' },
          { step: '4', icon: '🍽️', title: 'Serve', desc: 'Check if your list matches perfectly' },
        ].map(({ step, icon, title, desc }) => (
          <div key={step} className="text-center bg-orange-50 rounded-xl p-4 border border-orange-200">
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-bold text-orange-800 text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <span className="font-bold text-orange-800 text-sm">📖 Learning Goals</span>
          <ul className="text-orange-700 text-xs mt-2 space-y-1">
            <li>• Understand list indexing [0], [1], [2]...</li>
            <li>• Master .append(), .insert(), .remove()</li>
            <li>• Learn when to use each method</li>
          </ul>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <span className="font-bold text-amber-800 text-sm">⚡ Challenge</span>
          <ul className="text-amber-700 text-xs mt-2 space-y-1">
            <li>• You MUST write actual code</li>
            <li>• Order matters — wrong position = fail</li>
            <li>• Reach 2000 pts within 5 minutes to win!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
