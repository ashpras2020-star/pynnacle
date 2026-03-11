// Python Executor Service
// Manages the Skulpt Web Worker and provides code execution interface

import type { ExecutionResult } from '@types';

type ExecutionCallback = (result: ExecutionResult) => void;

class PythonExecutor {
  private worker: Worker | null = null;
  private isReady = false;
  private readyCallbacks: (() => void)[] = [];
  private executionCallbacks = new Map<string, ExecutionCallback>();
  private executionId = 0;

  constructor() {
    this.initializeWorker();
  }

  private initializeWorker() {
    try {
      // Create worker from the pythonWorker.ts file
      // Note: Not using type: 'module' so we can use importScripts() for Skulpt
      this.worker = new Worker(
        new URL('./pythonWorker.ts', import.meta.url)
      );

      // Handle messages from worker
      this.worker.onmessage = (event) => {
        const message = event.data;

        switch (message.type) {
          case 'ready':
            console.log('[Executor] Python is ready!');
            this.isReady = true;
            this.readyCallbacks.forEach(callback => callback());
            this.readyCallbacks = [];
            break;

          case 'result':
            const callback = this.executionCallbacks.get(message.id);
            if (callback) {
              callback(message.result);
              this.executionCallbacks.delete(message.id);
            }
            break;

          case 'error':
            console.error('[Executor] Worker error:', message.error);
            break;

          default:
            console.warn('[Executor] Unknown message from worker:', message);
        }
      };

      // Handle worker errors
      this.worker.onerror = (error) => {
        console.error('[Executor] Worker error:', error);
      };

      // Send init message
      this.worker.postMessage({ type: 'init' });
    } catch (error) {
      console.error('[Executor] Failed to create worker:', error);
    }
  }

  /**
   * Wait for Skulpt to be ready
   */
  async waitForReady(): Promise<void> {
    if (this.isReady) return;

    return new Promise((resolve) => {
      this.readyCallbacks.push(resolve);
    });
  }

  /**
   * Execute Python code
   * @param code - Python code to execute
   * @param timeout - Optional timeout in milliseconds (default: 10000)
   * @returns Promise with execution result
   */
  async runCode(code: string, timeout = 10000): Promise<ExecutionResult> {
    // Wait for Python to be ready
    await this.waitForReady();

    if (!this.worker) {
      return {
        output: '',
        error: 'Python executor not initialized',
        executionTime: 0,
      };
    }

    // Generate unique execution ID
    const id = `exec_${++this.executionId}`;

    return new Promise((resolve, reject) => {
      // Set up timeout
      const timeoutId = setTimeout(() => {
        this.executionCallbacks.delete(id);
        resolve({
          output: '',
          error: 'Execution timed out (> 10 seconds)',
          executionTime: timeout,
        });
      }, timeout);

      // Store callback
      this.executionCallbacks.set(id, (result) => {
        clearTimeout(timeoutId);
        resolve(result);
      });

      // Send execution request to worker
      this.worker!.postMessage({
        type: 'execute',
        code,
        id,
      });
    });
  }

  /**
   * Check if Python is ready
   */
  get ready(): boolean {
    return this.isReady;
  }

  /**
   * Terminate the worker
   */
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.isReady = false;
    }
  }
}

// Create and export singleton instance
export const pythonExecutor = new PythonExecutor();

// Export the class for testing
export { PythonExecutor };
