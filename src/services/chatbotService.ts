// AI Chatbot Service - Python learning assistant
// Uses OpenAI to answer Python questions and provide help

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
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      return {
        message: "I'm sorry, but I'm not available right now. The chatbot requires an OpenAI API key to function.",
        error: 'API key not configured',
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
    }

    // Build messages array
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...chatHistory,
      { role: 'user' as const, content: message },
    ];

    console.log('Sending message to chatbot...');

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7, // Slightly creative but still consistent
        max_tokens: 500, // Keep responses concise
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', response.status, errorData);

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
