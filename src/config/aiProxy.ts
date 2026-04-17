// Firebase Cloud Function URL for OpenAI proxy
// This keeps the API key on the server — never exposed to the browser

// After deploying, Firebase will give you a URL like:
// https://openaiproxy-XXXXXXXX-uc.a.run.app
// Set it in your .env as VITE_AI_PROXY_URL
export const AI_PROXY_URL = import.meta.env.VITE_AI_PROXY_URL || '';
