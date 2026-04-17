// Monaco Code Editor Component
// Wrapper around Monaco Editor configured for Python

import { Editor, loader } from '@monaco-editor/react';
import { useRef } from 'react';
import type { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

// Set up workers locally so Monaco doesn't need any CDN
(self as any).MonacoEnvironment = {
  getWorker(_: any, _label: string) {
    return new editorWorker();
  },
};

// Use locally bundled Monaco instead of jsdelivr CDN (blocked on school networks)
loader.config({ monaco });

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
  theme?: 'vs-light' | 'vs-dark' | 'purple-theme';
}

export function CodeEditor({
  value,
  onChange,
  height = '400px',
  readOnly = false,
  theme = 'purple-theme'
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;

    // Focus the editor
    editor.focus();
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      onChange(value);
    }
  }

  // Define custom purple theme when Monaco loads
  function handleEditorWillMount(monaco: any) {
    monaco.editor.defineTheme('purple-theme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '9ca3af', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7e22ce', fontStyle: 'bold' },
        { token: 'string', foreground: '10b981' },
        { token: 'number', foreground: 'a855f7' },
        { token: 'function', foreground: '8b5cf6' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1f2937',
        'editor.lineHighlightBackground': '#f3e8ff20',
        'editor.selectionBackground': '#e9d5ff',
        'editorLineNumber.foreground': '#9ca3af',
        'editorCursor.foreground': '#a855f7',
      }
    });
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <Editor
        height={height}
        defaultLanguage="python"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          readOnly,
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontLigatures: true,
          padding: { top: 16, bottom: 16 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          acceptSuggestionOnEnter: 'on',
        }}
      />
    </div>
  );
}
