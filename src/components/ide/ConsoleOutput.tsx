// Console Output Component
// Displays Python execution output and errors

import { Terminal } from 'lucide-react';

interface ConsoleOutputProps {
  output: string;
  error?: string;
  executionTime?: number;
  isRunning?: boolean;
}

export function ConsoleOutput({
  output,
  error,
  executionTime,
  isRunning = false
}: ConsoleOutputProps) {
  const hasContent = output || error;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Terminal className="w-4 h-4" />
          <span>Output</span>
        </div>
        {executionTime !== undefined && !isRunning && (
          <span className="text-xs text-gray-500">
            {executionTime.toFixed(0)}ms
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm min-h-[150px] max-h-[300px] overflow-auto">
        {isRunning ? (
          <div className="flex items-center gap-2 text-primary-500">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
            <span>Running...</span>
          </div>
        ) : error ? (
          <div className="text-error whitespace-pre-wrap">{error}</div>
        ) : output ? (
          <div className="text-gray-800 whitespace-pre-wrap">{output}</div>
        ) : (
          <div className="text-gray-400 italic">
            Click "Run Code" to see output here
          </div>
        )}
      </div>
    </div>
  );
}
