// IDE Container Component
// Complete code editor with execution capabilities

import { useState, useEffect } from 'react';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { RunButton } from './RunButton';
import { pythonExecutor } from '@services/pythonExecutor';
import type { ExecutionResult } from '@types';

interface IDEContainerProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  readOnly?: boolean;
  showRunButton?: boolean;
}

export function IDEContainer({
  initialCode = '# Write your Python code here\nprint("Hello, World!")',
  onCodeChange,
  readOnly = false,
  showRunButton = true,
}: IDEContainerProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [executionTime, setExecutionTime] = useState<number | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [isPythonReady, setIsPythonReady] = useState(pythonExecutor.ready);
  const [loadingMessage, setLoadingMessage] = useState('Loading Python engine (Skulpt)...');
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Wait for Python to be ready
  useEffect(() => {
    if (pythonExecutor.ready) {
      setIsPythonReady(true);
      return;
    }

    // Set timeout warning after 3 seconds (should load in under 1 second)
    const warningTimeout = setTimeout(() => {
      setLoadingMessage('Taking longer than expected...');
    }, 3000);

    // Set failure state after 10 seconds
    const failureTimeout = setTimeout(() => {
      setLoadingMessage('Python engine could not load');
      setLoadingFailed(true);
      setError('Python failed to load. You can still view the lesson content, but code execution is unavailable. Try refreshing the page.');
    }, 10000);

    pythonExecutor.waitForReady().then(() => {
      clearTimeout(warningTimeout);
      clearTimeout(failureTimeout);
      setIsPythonReady(true);
      setLoadingMessage('');
      setLoadingFailed(false);
    }).catch((err) => {
      clearTimeout(warningTimeout);
      clearTimeout(failureTimeout);
      setLoadingFailed(true);
      setError(`Python failed to initialize: ${err}. You can still view lesson content.`);
    });

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(failureTimeout);
    };
  }, []);

  function handleCodeChange(newCode: string) {
    setCode(newCode);
    onCodeChange?.(newCode);
  }

  async function handleRunCode() {
    if (loadingFailed) {
      setError('Python runtime is unavailable. Please refresh the page to try again.');
      return;
    }

    if (!isPythonReady) {
      setError('Python is still loading... Please wait a moment.');
      return;
    }

    setIsRunning(true);
    setOutput('');
    setError(undefined);
    setExecutionTime(undefined);

    try {
      const result: ExecutionResult = await pythonExecutor.runCode(code);

      setOutput(result.output);
      setError(result.error);
      setExecutionTime(result.executionTime);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Code Editor */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Code Editor</h3>
          {!isPythonReady && !loadingFailed && (
            <span className="text-xs text-purple-600 flex items-center gap-1">
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-purple-600 border-t-transparent"></div>
              {loadingMessage}
            </span>
          )}
          {loadingFailed && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-600 flex items-center gap-1">
                ⚠️ Python unavailable
              </span>
              <button
                onClick={() => setShowDiagnostics(!showDiagnostics)}
                className="text-xs text-purple-600 hover:text-purple-700 underline"
              >
                {showDiagnostics ? 'Hide' : 'Show'} diagnostics
              </button>
            </div>
          )}
        </div>

        {/* Diagnostics Panel */}
        {showDiagnostics && loadingFailed && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-xs">
            <div className="font-semibold text-red-800 mb-2">Troubleshooting Python Load Failure:</div>
            <div className="space-y-1 text-red-700">
              <div>1. Open browser console (F12) and look for errors</div>
              <div>2. Check if you have an ad blocker blocking cdn.jsdelivr.net</div>
              <div>3. Try a different browser (Chrome/Firefox recommended)</div>
              <div>4. Check your internet connection</div>
              <div>5. Try refreshing the page (Ctrl+R or Cmd+R)</div>
            </div>
            <div className="mt-2 pt-2 border-t border-red-200 text-red-600">
              Note: You can still view lesson content and edit code, just can't run it.
            </div>
          </div>
        )}

        {/* Info Banner - input() not supported */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="text-blue-600 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-blue-800 mb-1">
                📝 Note: Interactive Input Not Supported
              </div>
              <div className="text-xs text-blue-700">
                <code className="bg-blue-100 px-1.5 py-0.5 rounded">input()</code> and other interactive inputs won't work in this web-based IDE.
                Instead, use <strong>hardcoded test values</strong> to test your code with different inputs.
              </div>
              <div className="mt-2 text-xs">
                <div className="text-blue-600 font-mono bg-blue-100 p-2 rounded">
                  <div className="text-blue-400"># ❌ This won't work:</div>
                  <div className="line-through opacity-50">num = int(input("Enter number: "))</div>
                  <div className="mt-2 text-blue-400"># ✅ Do this instead:</div>
                  <div>num = 5  # Test with different values!</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          readOnly={readOnly}
        />
      </div>

      {/* Run Button */}
      {showRunButton && (
        <div>
          <RunButton
            onClick={handleRunCode}
            isRunning={isRunning}
            disabled={!isPythonReady}
          />
        </div>
      )}

      {/* Console Output */}
      <ConsoleOutput
        output={output}
        error={error}
        executionTime={executionTime}
        isRunning={isRunning}
      />
    </div>
  );
}
