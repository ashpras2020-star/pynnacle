import { motion, AnimatePresence } from 'framer-motion';
import type { Ingredient } from './types';

interface KitchenProps {
  ingredients: Ingredient[];
  timeLeft: number;
  gameActive: boolean;
}

export function Kitchen({ ingredients, timeLeft, gameActive }: KitchenProps) {
  return (
    <div className="lc-panel rounded-2xl p-6">
      <h2 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
        🍳 Cooking Pot
        <span className="text-xs font-normal text-gray-400 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
          ingredients list
        </span>
      </h2>

      {/* Cooking Pot */}
      <div className="relative">
        {/* Pot Rim */}
        <div className="lc-pot-rim h-3 rounded-t-xl relative z-10" />

        {/* Pot Body */}
        <div className="lc-pot rounded-b-3xl p-8 pt-6 min-h-[280px] relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent" />

          {/* Steam particles */}
          {gameActive && ingredients.length > 0 && (
            <>
              <div className="lc-steam-particle" style={{ left: '25%', top: '-8px', animationDelay: '0s' }} />
              <div className="lc-steam-particle" style={{ left: '50%', top: '-8px', animationDelay: '0.7s' }} />
              <div className="lc-steam-particle" style={{ left: '70%', top: '-8px', animationDelay: '1.3s' }} />
            </>
          )}

          {/* Ingredients */}
          <div className="relative z-10 flex flex-wrap gap-3 justify-center">
            <AnimatePresence>
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={`${ingredient}-${index}`}
                  initial={{ scale: 0, y: -50, rotate: -180 }}
                  animate={{ scale: 1, y: 0, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="bubbling"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="lc-ingredient-tag rounded-xl p-3">
                    <div className="text-3xl">{ingredient}</div>
                    <div className="text-xs text-center text-orange-500 mt-1 font-mono font-bold">
                      [{index}]
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {ingredients.length === 0 && (
              <div className="text-stone-500 text-center py-12">
                <div className="text-5xl mb-3 opacity-60">🥘</div>
                <div className="text-sm">Empty pot — add ingredients!</div>
              </div>
            )}
          </div>
        </div>

        {/* Pot Handles */}
        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-14 bg-gradient-to-l from-stone-500 to-stone-600 rounded-l-full border-2 border-stone-700" />
        </div>
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-14 bg-gradient-to-r from-stone-500 to-stone-600 rounded-r-full border-2 border-stone-700" />
        </div>
      </div>

      {/* Timer */}
      <div className={`mt-4 p-3 rounded-xl text-center border ${
        timeLeft <= 30
          ? 'bg-red-50 border-red-200'
          : 'bg-orange-50 border-orange-200'
      }`}>
        <div className={`text-3xl font-bold font-mono ${timeLeft <= 30 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
          ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className={`text-xs mt-0.5 ${timeLeft <= 30 ? 'text-red-500' : 'text-orange-500'}`}>Time Remaining</div>
      </div>

      {/* List Info */}
      <div className="mt-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-orange-800 text-sm">Length:</span>
            <span className="ml-2 text-orange-600 font-mono font-bold">{ingredients.length}</span>
          </div>
          <code className="text-xs bg-white px-2 py-1 rounded border border-orange-200 text-orange-700">len(ingredients)</code>
        </div>
        {ingredients.length > 0 && (
          <div className="mt-2 text-xs text-orange-700">
            <code className="bg-white px-2 py-1 rounded font-mono border border-orange-200 block overflow-x-auto">
              {JSON.stringify(ingredients)}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
