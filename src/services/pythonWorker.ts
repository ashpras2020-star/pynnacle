// Web Worker for executing Python code using Pyodide
// This runs in a separate thread to prevent blocking the UI

let pyodide: any = null;
let isInitialized = false;

// Message types
interface ExecuteMessage {
  type: 'execute';
  code: string;
  id: string;
}

interface InitMessage {
  type: 'init';
}

type WorkerMessage = ExecuteMessage | InitMessage;

// Initialize Pyodide
async function initializePyodide() {
  if (isInitialized) return;

  const startTime = performance.now();

  console.log('[Worker] 🔄 Starting Pyodide initialization...');
  console.log('[Worker] 📡 Loading full Python interpreter (this may take a few seconds)...');

  try {
    // Load Pyodide from CDN
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

    // @ts-ignore - loadPyodide is loaded from the script above
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
    });

    // Setup custom input function with helpful error
    await pyodide.runPythonAsync(`
import builtins

def custom_input(prompt=''):
    """Input is not supported in the web IDE"""
    raise NotImplementedError(
        f"{prompt}\\n\\n" +
        "❌ input() is not supported in this web-based IDE.\\n\\n" +
        "💡 Instead, use hardcoded test values:\\n\\n" +
        "# Before (doesn't work):\\n" +
        "# num1 = int(input('Enter number: '))\\n\\n" +
        "# After (works!):\\n" +
        "num1 = 5  # Use a test value\\n" +
        "num2 = 10\\n" +
        "print(num1 + num2)  # Output: 15"
    )

# Replace built-in input with custom version
builtins.input = custom_input
`);

    const loadTime = ((performance.now() - startTime) / 1000).toFixed(2);
    isInitialized = true;

    console.log(`[Worker] ✅ Pyodide loaded successfully in ${loadTime}s!`);
    self.postMessage({ type: 'ready' });

  } catch (error: any) {
    console.error('[Worker] ❌ Pyodide failed to load:', error);
    self.postMessage({
      type: 'error',
      error: `Python failed to load. Error: ${error.message}. Check your internet connection.`
    });
  }
}

// Execute Python code
async function executePythonCode(code: string, id: string) {
  if (!isInitialized || !pyodide) {
    self.postMessage({
      type: 'result',
      id,
      result: {
        output: '',
        error: 'Python not initialized yet. Please wait...',
        executionTime: 0,
      },
    });
    return;
  }

  const startTime = performance.now();

  try {
    // Run the code and capture output
    const result = await pyodide.runPythonAsync(`
import sys
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
    output = sys.stdout.getvalue()
finally:
    sys.stdout = old_stdout

output
`);

    const executionTime = performance.now() - startTime;

    self.postMessage({
      type: 'result',
      id,
      result: {
        output: result || '',
        error: undefined,
        executionTime,
      },
    });

  } catch (err: any) {
    const executionTime = performance.now() - startTime;

    // Extract error message from Python exception
    let errorMessage = err.message || err.toString();

    // Clean up the error message
    if (errorMessage.includes('PythonError')) {
      errorMessage = errorMessage.replace(/PythonError: /g, '');
    }

    self.postMessage({
      type: 'result',
      id,
      result: {
        output: '',
        error: errorMessage,
        executionTime,
      },
    });
  }
}

// Handle messages from main thread
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;

  switch (message.type) {
    case 'init':
      await initializePyodide();
      break;

    case 'execute':
      await executePythonCode(message.code, message.id);
      break;

    default:
      console.warn('[Worker] Unknown message type:', message);
  }
};

// Auto-initialize when worker starts
initializePyodide();
