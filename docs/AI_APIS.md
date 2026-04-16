# AI APIs Supported in Articles Pipeline

This project can generate medical article summaries using the providers below (fallback cascade):

1. Gemini (Google AI Studio)
2. Groq
3. OpenRouter
4. Together AI
5. DeepSeek
6. Mistral
7. SiliconFlow
8. Anthropic (Claude)
9. OpenAI

## Environment variables

- `GEMINI_API_KEY`
- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `TOGETHER_API_KEY`
- `DEEPSEEK_API_KEY`
- `MISTRAL_API_KEY`
- `SILICONFLOW_API_KEY`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`

Optional model overrides:

- `TOGETHER_MODEL`
- `DEEPSEEK_MODEL`
- `MISTRAL_MODEL`
- `ANTHROPIC_MODEL`

## Notes

- The pipeline stores `aiProvider` in each processed article.
- Duplicate protection is enforced by PMID, DOI, or normalized title.
- Hourly ingestion is configured in `.github/workflows/hourly-articles.yml`.
