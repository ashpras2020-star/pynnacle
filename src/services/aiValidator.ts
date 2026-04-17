// AI-powered code validation service
// Uses Firebase Cloud Function proxy to securely call OpenAI

import { AI_PROXY_URL } from '@config/aiProxy';

interface ValidationRequest {
  challengePrompt: string;
  studentCode: string;
  expectedSolution?: string;
  hints?: string[];
}

interface ValidationResponse {
  isCorrect: boolean;
  feedback: string;
  suggestions?: string[];
}

/**
 * Validates student code using AI
 * Checks if the code correctly solves the challenge prompt
 */
export async function validateCodeWithAI(
  request: ValidationRequest
): Promise<ValidationResponse> {
  const { challengePrompt, studentCode, expectedSolution } = request;

  // If no code provided, return early
  if (!studentCode.trim() || studentCode.trim() === '# Write your solution here') {
    return {
      isCorrect: false,
      feedback: 'Please write some code before validating!',
    };
  }

  try {
    if (!AI_PROXY_URL) {
      console.warn('AI proxy URL not configured');
      return basicValidation(studentCode, challengePrompt);
    }

    // Prepare the AI prompt for validation
    const systemPrompt = `You are a Python code validator for a beginner learning platform.
Your job is to check if student code correctly solves the given challenge.

Rules:
1. Be encouraging and supportive
2. Focus on whether the code solves the problem, not code style
3. For beginners, accept any working solution even if it's not optimal
4. If incorrect, give a specific, actionable hint
5. Respond with JSON: { "isCorrect": boolean, "feedback": string, "suggestions": string[] }`;

    const userPrompt = `Challenge:
${challengePrompt}

Student's Code:
\`\`\`python
${studentCode}
\`\`\`

${expectedSolution ? `Expected Solution (for reference):
\`\`\`python
${expectedSolution}
\`\`\`
` : ''}

Validate if the student's code correctly solves the challenge. Return JSON only.`;

    console.log('Calling AI proxy for validation...');

    // Call Firebase Cloud Function proxy
    const response = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('AI proxy error:', response.status, errorData);
      throw new Error(`AI proxy error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI validation response received');

    const result = JSON.parse(data.choices[0].message.content);

    return {
      isCorrect: result.isCorrect,
      feedback: result.feedback,
      suggestions: result.suggestions || [],
    };
  } catch (error) {
    console.error('AI validation error:', error);

    if (error instanceof Error && error.message.includes('proxy error')) {
      return {
        isCorrect: false,
        feedback: `AI validation failed: ${error.message}. Using basic validation instead.`,
      };
    }

    // Fallback to basic validation if AI fails
    return basicValidation(studentCode, challengePrompt);
  }
}

/**
 * Fallback validation when AI is unavailable
 * Basic checks for common issues
 */
function basicValidation(
  code: string,
  prompt: string
): ValidationResponse {
  // Check if code has any syntax
  if (code.trim().length < 10) {
    return {
      isCorrect: false,
      feedback: 'Your code seems too short. Make sure to implement the full solution!',
    };
  }

  // Check for common beginner mistakes
  const hasIndentation = /^\s+/m.test(code);
  const hasPrint = /print\s*\(/.test(code);
  const hasFunction = /def\s+\w+/.test(code);

  // Basic heuristic: if prompt mentions "print" and code doesn't have it
  if (prompt.toLowerCase().includes('print') && !hasPrint) {
    return {
      isCorrect: false,
      feedback: 'This challenge requires using print(). Make sure to print your output!',
    };
  }

  // Basic heuristic: if prompt mentions "function" and code doesn't define one
  if (prompt.toLowerCase().includes('function') && !hasFunction) {
    return {
      isCorrect: false,
      feedback: 'This challenge requires defining a function. Use the def keyword!',
    };
  }

  // If we get here, assume it's correct (since AI validation failed)
  return {
    isCorrect: true,
    feedback: '✅ Your code looks good! (Note: AI validation unavailable)',
    suggestions: [],
  };
}
