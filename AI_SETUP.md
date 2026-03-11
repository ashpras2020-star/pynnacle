# AI-Powered Code Validation Setup

This application uses OpenAI's GPT-4o-mini model to intelligently validate student code submissions.

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the API key (you won't be able to see it again!)

### 2. Add API Key to Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. Restart the development server:
   ```bash
   npm run dev
   ```

## How It Works

When a student submits their code for validation:

1. **AI Analysis**: The code is sent to GPT-4o-mini along with the challenge prompt
2. **Intelligent Validation**: AI checks if the code correctly solves the problem
3. **Helpful Feedback**: Students receive specific, actionable feedback
4. **Graceful Fallback**: If AI is unavailable, basic validation is used

## Features

- ✅ **Accurate**: Validates correctness, not just code style
- ✅ **Beginner-Friendly**: Accepts any working solution
- ✅ **Helpful**: Provides specific hints when code is incorrect
- ✅ **Fast**: Uses GPT-4o-mini for quick responses
- ✅ **Cost-Effective**: Optimized prompts minimize token usage
- ✅ **Reliable**: Falls back to basic validation if AI fails

## API Costs

GPT-4o-mini pricing (as of 2024):
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens

Estimated cost per validation: **~$0.001** (less than a tenth of a cent)

## Security

- ✅ `.env` file is git-ignored (never committed)
- ✅ API key is only used client-side for this learning platform
- ✅ No student data is stored by OpenAI

## Troubleshooting

**Error: "OpenAI API error: 401"**
- Check that your API key is correct in `.env`
- Make sure the key starts with `sk-`
- Verify you have credits in your OpenAI account

**Validation is slow**
- GPT-4o-mini is already the fastest model
- Check your internet connection
- OpenAI API may be experiencing high load

**Fallback validation being used**
- Check browser console for errors
- Verify `.env` file is in the correct location
- Restart the dev server after adding the API key
