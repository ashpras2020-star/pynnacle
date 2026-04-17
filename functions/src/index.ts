import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";

// OpenAI API key stored securely in Firebase environment config
const openaiApiKey = defineString("OPENAI_API_KEY");

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "http://localhost:5185",
  "https://ashpras2020-star.github.io",
];

function getCorsHeaders(origin: string | undefined) {
  const allowedOrigin = ALLOWED_ORIGINS.find((o) => origin?.startsWith(o));
  return {
    "Access-Control-Allow-Origin": allowedOrigin || ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "3600",
  };
}

/**
 * Proxy for OpenAI chat completions API.
 * Accepts the same body format as OpenAI but keeps the API key server-side.
 */
export const openaiProxy = onRequest(
  { cors: false, region: "us-central1" },
  async (req, res) => {
    const origin = req.headers.origin;
    const cors = getCorsHeaders(origin);

    // Set CORS headers
    for (const [key, value] of Object.entries(cors)) {
      res.set(key, value);
    }

    // Handle preflight
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    // Validate origin
    const isAllowed = ALLOWED_ORIGINS.some((o) => origin?.startsWith(o));
    if (!isAllowed) {
      res.status(403).json({ error: "Origin not allowed" });
      return;
    }

    try {
      const { messages, temperature, max_tokens, response_format } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "messages array is required" });
        return;
      }

      // Call OpenAI API with the secure key
      const openaiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey.value()}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: temperature ?? 0.5,
            ...(max_tokens && { max_tokens }),
            ...(response_format && { response_format }),
          }),
        }
      );

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json().catch(() => ({}));
        console.error("OpenAI API error:", openaiResponse.status, errorData);
        res.status(openaiResponse.status).json({
          error: `OpenAI API error: ${openaiResponse.status}`,
          details: (errorData as Record<string, unknown>).error || "Unknown error",
        });
        return;
      }

      const data = await openaiResponse.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
