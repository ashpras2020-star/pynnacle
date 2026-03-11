import type { FileSorterGame } from '../../../types/game';

export const module10DungeonArchiveGame: FileSorterGame = {
  id: 'file-sorter-module-10',
  moduleId: 'module-10',
  title: 'File Sorter',
  description: 'Sort incoming file operation cards into the correct bins before time runs out!',
  baseXP: 200,
  bonusXP: 300,
  cards: [
    // ── Easy (cards 1-5, 12s timer) ──
    {
      id: 1,
      prompt: 'Open a file to READ its contents',
      difficulty: 'easy',
      options: [
        { id: 'r', label: "'r'" },
        { id: 'w', label: "'w'" },
        { id: 'a', label: "'a'" },
      ],
      correctOptionId: 'r',
    },
    {
      id: 2,
      prompt: 'Open a file to WRITE (create or overwrite)',
      difficulty: 'easy',
      options: [
        { id: 'r', label: "'r'" },
        { id: 'w', label: "'w'" },
        { id: 'a', label: "'a'" },
      ],
      correctOptionId: 'w',
    },
    {
      id: 3,
      prompt: 'Open a file to APPEND data to the end',
      difficulty: 'easy',
      options: [
        { id: 'r', label: "'r'" },
        { id: 'w', label: "'w'" },
        { id: 'a', label: "'a'" },
      ],
      correctOptionId: 'a',
    },
    {
      id: 4,
      prompt: 'Read the ENTIRE file as one string',
      difficulty: 'easy',
      options: [
        { id: 'read', label: '.read()' },
        { id: 'readlines', label: '.readlines()' },
        { id: 'readline', label: '.readline()' },
      ],
      correctOptionId: 'read',
    },
    {
      id: 5,
      prompt: 'Read ONE line from a file',
      difficulty: 'easy',
      options: [
        { id: 'read', label: '.read()' },
        { id: 'readlines', label: '.readlines()' },
        { id: 'readline', label: '.readline()' },
      ],
      correctOptionId: 'readline',
    },

    // ── Medium (cards 6-10, 10s timer) ──
    {
      id: 6,
      prompt: 'Read all lines into a LIST',
      difficulty: 'medium',
      options: [
        { id: 'readline', label: '.readline()' },
        { id: 'read', label: '.read()' },
        { id: 'readlines', label: '.readlines()' },
      ],
      correctOptionId: 'readlines',
    },
    {
      id: 7,
      prompt: 'Which ensures the file is automatically closed?',
      difficulty: 'medium',
      options: [
        { id: 'manual', label: 'open() then close()' },
        { id: 'with', label: 'with open() as f:' },
        { id: 'fopen', label: 'f.open()' },
      ],
      correctOptionId: 'with',
    },
    {
      id: 8,
      prompt: 'Write text to a file',
      difficulty: 'medium',
      options: [
        { id: 'fread', label: "f.read('text')" },
        { id: 'fappend', label: "f.append('text')" },
        { id: 'write', label: "f.write('text')" },
      ],
      correctOptionId: 'write',
    },
    {
      id: 9,
      prompt: 'Read a file LINE BY LINE efficiently',
      difficulty: 'medium',
      options: [
        { id: 'readsplit', label: 'f.read().split()' },
        { id: 'forline', label: 'for line in f:' },
        { id: 'readlines0', label: 'f.readlines()[0]' },
      ],
      correctOptionId: 'forline',
    },
    {
      id: 10,
      prompt: 'Write a list of strings with newlines between items',
      difficulty: 'medium',
      options: [
        { id: 'writelist', label: 'f.write(items)' },
        { id: 'join', label: "f.write('\\n'.join(items))" },
        { id: 'writelines', label: 'f.writelines(items)' },
      ],
      correctOptionId: 'join',
    },

    // ── Hard (cards 11-15, 8s timer) ──
    {
      id: 11,
      prompt: "Create a Path object for 'data/log.txt'",
      difficulty: 'hard',
      options: [
        { id: 'pathlib', label: "Path('data/log.txt')" },
        { id: 'openpath', label: "open('data/log.txt')" },
        { id: 'ospath', label: "os.path('data/log.txt')" },
      ],
      correctOptionId: 'pathlib',
    },
    {
      id: 12,
      prompt: 'Check if a file exists before reading',
      difficulty: 'hard',
      options: [
        { id: 'exists', label: 'path.exists()' },
        { id: 'pathopen', label: 'path.open()' },
        { id: 'pathcheck', label: 'path.check()' },
      ],
      correctOptionId: 'exists',
    },
    {
      id: 13,
      prompt: "What does mode 'w' do to an existing file?",
      difficulty: 'hard',
      options: [
        { id: 'appends', label: 'Appends to it' },
        { id: 'erases', label: 'Erases & overwrites' },
        { id: 'error', label: 'Raises an error' },
      ],
      correctOptionId: 'erases',
    },
    {
      id: 14,
      prompt: 'Read a binary file (like an image)',
      difficulty: 'hard',
      options: [
        { id: 'r', label: "'r'" },
        { id: 'rb', label: "'rb'" },
        { id: 'b', label: "'b'" },
      ],
      correctOptionId: 'rb',
    },
    {
      id: 15,
      prompt: 'Get the file extension from a Path object',
      difficulty: 'hard',
      options: [
        { id: 'suffix', label: 'path.suffix' },
        { id: 'ext', label: 'path.ext' },
        { id: 'extension', label: 'path.extension' },
      ],
      correctOptionId: 'suffix',
    },
  ],
};
