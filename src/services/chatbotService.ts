// AI Chatbot Service - Python learning assistant
// Uses Firebase Cloud Function proxy to securely call OpenAI

import { AI_PROXY_URL } from '@config/aiProxy';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  chatHistory: ChatMessage[];
  lessonContext?: {
    lessonId: string;
    lessonTitle: string;
    concepts: string[];
    challengePrompt?: string;
  };
}

interface ChatResponse {
  message: string;
  error?: string;
}

/**
 * Send a message to the AI chatbot and get a response
 */
export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  const { message, chatHistory, lessonContext } = request;

  try {
    if (!AI_PROXY_URL) {
      return {
        message: "I'm sorry, but I'm not available right now. The AI service is not configured.",
        error: 'AI proxy not configured',
      };
    }

    // Build system prompt with context awareness
    let systemPrompt = `You are a friendly and helpful Python programming tutor for beginners.

Your role:
- Answer Python questions clearly and simply
- Provide code examples when helpful
- Be encouraging and supportive
- Explain concepts step-by-step
- Don't give away complete solutions to challenges - guide with hints instead

Guidelines:
- Keep responses concise (2-3 paragraphs max)
- Use simple language for beginners
- Show code examples in markdown code blocks
- If asked about a lesson challenge, give hints but not the complete answer
- Always be positive and encouraging`;

    // Add lesson context if available
    if (lessonContext) {
      systemPrompt += `\n\nCurrent lesson context:
- Lesson: ${lessonContext.lessonTitle}
- Concepts: ${lessonContext.concepts.join(', ')}

The student is working on this lesson, so tailor your explanations to be relevant.`;

      if (lessonContext.challengePrompt) {
        systemPrompt += `\n\nThis lesson has a coding challenge the student must pass with AI validation:
--- CHALLENGE ---
${lessonContext.challengePrompt}
--- END CHALLENGE ---

STRICT RULE: You must NEVER give the student the complete solution code for this specific challenge. You may give short hints (1-2 lines), explain concepts, point out what's missing, or give a tiny illustrative snippet that is NOT the answer — but never provide a full working solution or anything that directly solves the challenge prompt. For all other Python questions unrelated to this challenge, you can give full code examples freely.`;
      }
    }

    // Build messages array
    const msgs = [
      { role: 'system' as const, content: systemPrompt },
      ...chatHistory,
      { role: 'user' as const, content: message },
    ];

    console.log('Sending message to chatbot...');

    // Call Firebase Cloud Function proxy
    const response = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: msgs,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('AI proxy error:', response.status, errorData);

      return {
        message: "I'm having trouble connecting right now. Please try again in a moment.",
        error: `API error: ${response.status}`,
      };
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    console.log('Chatbot response received');

    return {
      message: aiMessage,
    };
  } catch (error) {
    console.error('Chatbot error:', error);

    return {
      message: "I encountered an error. Please try asking your question again.",
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
