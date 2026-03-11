// Run Button Component
// Button to execute Python code

import { Play, Loader2 } from 'lucide-react';

interface RunButtonProps {
  onClick: () => void;
  isRunning: boolean;
  disabled?: boolean;
}

export function RunButton({ onClick, isRunning, disabled = false }: RunButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isRunning}
      className="
        inline-flex items-center gap-2 px-6 py-2.5
        bg-purple-600 hover:bg-purple-700
        disabled:bg-gray-300 disabled:cursor-not-allowed
        text-white font-medium rounded-lg
        transition-colors duration-200
        shadow-md hover:shadow-lg
      "
    >
      {isRunning ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Running...</span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          <span>Run Code</span>
        </>
      )}
    </button>
  );
}
