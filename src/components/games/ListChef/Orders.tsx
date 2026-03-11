import { motion } from 'framer-motion';
import type { Recipe } from './types';

interface OrdersProps {
  currentOrder: Recipe;
  onCheck: () => boolean;
  gameActive: boolean;
}

export function Orders({ currentOrder, onCheck, gameActive }: OrdersProps) {
  const handleCheck = () => {
    const success = onCheck();
    if (success) {
      console.log('Order completed!');
    } else {
      console.log('Not quite right...');
    }
  };

  const difficultyBadge: Record<string, string> = {
    easy: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    medium: 'bg-amber-100 text-amber-700 border-amber-300',
    hard: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <div className="lc-panel rounded-2xl p-6">
      <h2 className="text-xl font-bold text-orange-800 mb-4">📋 Current Order</h2>

      <motion.div
        key={currentOrder.name}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="lc-order-card rounded-xl p-5"
      >
        {/* Order Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-orange-800">{currentOrder.name}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${difficultyBadge[currentOrder.difficulty]}`}>
            {currentOrder.difficulty}
          </span>
        </div>

        {/* Points */}
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold text-orange-600 font-mono">
            {currentOrder.points} <span className="text-sm text-orange-400">pts</span>
          </div>
        </div>

        {/* Required Ingredients */}
        <div className="mb-4">
          <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Required (in order)
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {currentOrder.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="lc-ingredient-tag rounded-xl p-2.5"
              >
                <div className="text-2xl">{ingredient}</div>
                <div className="text-xs text-center text-orange-500 mt-0.5 font-mono font-bold">
                  [{index}]
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Python Representation */}
        <div className="p-3 lc-chalkboard rounded-lg mb-4">
          <div className="text-xs text-gray-400 mb-1">Target list:</div>
          <code className="text-green-400 font-mono text-sm">
            {JSON.stringify(currentOrder.ingredients)}
          </code>
        </div>

        {/* Serve Button */}
        <button
          onClick={handleCheck}
          disabled={!gameActive}
          className={`w-full py-3 font-bold rounded-xl shadow-md transition-all ${
            gameActive
              ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white shadow-emerald-500/15'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          ✅ Serve Dish
        </button>

        {!gameActive && (
          <div className="mt-2 text-center text-xs text-gray-400">
            Start the game to begin cooking!
          </div>
        )}
      </motion.div>

      {/* Tip */}
      <div className="mt-4 lc-tip-panel rounded-xl p-3">
        <div className="text-sm text-emerald-700">
          <span className="font-bold">💡 Tip:</span> Order matters! Use <code className="bg-white px-1 rounded border border-emerald-200">.insert()</code> for specific positions.
        </div>
      </div>
    </div>
  );
}
