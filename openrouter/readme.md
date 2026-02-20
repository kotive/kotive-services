# OpenRouter

A unified API for accessing leading AI models. Route requests to hundreds of LLMs with a single API key.

## Service Configuration

- **File:** `config.json`
- **Name:** OpenRouter
- **Auth Method:** Custom
- **Domain:** `https://openrouter.ai`

### Authentication Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| API Key | `apikey` | text | Yes |

Your OpenRouter API key. Found at [https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys). Never expose your API key in client-side code.

---

## Tasks

### Chat Completion

- **File:** `chat_completion.json`
- **Description:** Send a chat completion request to an AI model via OpenRouter. Supports hundreds of models from providers like OpenAI, Anthropic, Google, Meta, and more.
- **Endpoint:** `POST /api/v1/chat/completions`
- **Documentation:** https://openrouter.ai/docs/api-reference/chat-completions

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Model | `model` | text | Yes |
| Messages | `messages` | textarea | Yes |
| Temperature | `temperature` | text | No |
| Max Tokens | `max_tokens` | text | No |
| Top P | `top_p` | text | No |
| Stream | `stream` | radio (`false` No, `true` Yes) | No |

#### Expected Response

```json
{
  "success": {
    "id": "gen-abc123",
    "model": "openai/gpt-4o",
    "choices": [
      {
        "message": {
          "role": "assistant",
          "content": "Hello! How can I help you today?"
        },
        "finish_reason": "stop"
      }
    ],
    "usage": {
      "prompt_tokens": 10,
      "completion_tokens": 15,
      "total_tokens": 25
    }
  },
  "error": {
    "error": {
      "code": 401,
      "message": "Invalid API key"
    }
  }
}
```

---

### Get Remaining Credits

- **File:** `get_credits.json`
- **Description:** Retrieve your current OpenRouter credit balance and usage information.
- **Endpoint:** `GET /api/v1/credits`
- **Documentation:** https://openrouter.ai/docs/api-reference/credits

#### Fields

No fields required.

#### Expected Response

```json
{
  "success": {
    "data": {
      "total_credits": 10.0,
      "total_usage": 2.5,
      "remaining_credits": 7.5
    }
  },
  "error": {
    "error": {
      "code": 401,
      "message": "Invalid API key"
    }
  }
}
```

---

### Create Embedding

- **File:** `create_embedding.json`
- **Description:** Submit an embedding request to generate vector representations of text. Useful for semantic search, clustering, and similarity comparisons.
- **Endpoint:** `POST /api/v1/embeddings`
- **Documentation:** https://openrouter.ai/docs/api-reference/embeddings

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Model | `model` | text | Yes |
| Input | `input` | textarea | Yes |

#### Expected Response

```json
{
  "success": {
    "object": "list",
    "data": [
      {
        "object": "embedding",
        "index": 0,
        "embedding": [0.0023, -0.0091, 0.0152, "..."]
      }
    ],
    "model": "openai/text-embedding-3-small",
    "usage": {
      "prompt_tokens": 5,
      "total_tokens": 5
    }
  },
  "error": {
    "error": {
      "code": 400,
      "message": "Invalid model for embeddings"
    }
  }
}
```

---

### Create Response

- **File:** `create_response.json`
- **Description:** Create a response using the OpenRouter Responses API. This endpoint supports multi-turn conversations with built-in tool use, web search, and file handling.
- **Endpoint:** `POST /api/v1/responses`
- **Documentation:** https://openrouter.ai/docs/api-reference/responses

#### Fields

| Label | Parameter | Type | Required |
|-------|-----------|------|----------|
| Model | `model` | text | Yes |
| Input | `input` | textarea | Yes |

#### Expected Response

```json
{
  "success": {
    "id": "resp-abc123",
    "object": "response",
    "model": "openai/gpt-4o",
    "output": [
      {
        "type": "message",
        "role": "assistant",
        "content": [
          {
            "type": "output_text",
            "text": "Hello! How can I help you today?"
          }
        ]
      }
    ],
    "usage": {
      "input_tokens": 10,
      "output_tokens": 15,
      "total_tokens": 25
    }
  },
  "error": {
    "error": {
      "code": 400,
      "message": "Invalid request"
    }
  }
}
```

---

## Further Reading

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Available Models](https://openrouter.ai/models)
- [API Keys](https://openrouter.ai/settings/keys)
