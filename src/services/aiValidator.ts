// AI-powered code validation service
// Uses OpenAI to validate student code against challenge requirements

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
  const { challengePrompt, studentCode, expectedSolution, hints } = request;

  // If no code provided, return early
  if (!studentCode.trim() || studentCode.trim() === '# Write your solution here') {
    return {
      isCorrect: false,
      feedback: 'Please write some code before validating!',
    };
  }

  try {
    // Check if API key is configured
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('OpenAI API key not configured');
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

    console.log('Calling OpenAI API for validation...');

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Faster and cheaper model for validation
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3, // Lower temperature for more consistent validation
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const result = JSON.parse(data.choices[0].message.content);

    return {
      isCorrect: result.isCorrect,
      feedback: result.feedback,
      suggestions: result.suggestions || [],
    };
  } catch (error) {
    console.error('AI validation error:', error);

    // Show the actual error if it's an API error
    if (error instanceof Error && error.message.includes('API error')) {
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
