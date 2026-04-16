export const environment = {
  production: false,
  appName: 'Vexlyn News',
  developerName: 'Angelo Marques',
  apiKeys: {
    // Google AI Studio – https://aistudio.google.com/apikey (free: 15 req/min, 1500 req/day)
    gemini: '',          // GEMINI_API_KEY

    // OpenRouter – https://openrouter.ai/keys (free models disponíveis)
    openRouter: '',      // OPENROUTER_API_KEY

    // SiliconFlow – https://cloud.siliconflow.cn (free tier com vários modelos)
    siliconFlow: '',     // SILICONFLOW_API_KEY

    // Groq – https://console.groq.com/keys (free: 14400 req/dia, extremamente rápido)
    groq: '',            // GROQ_API_KEY

    // OpenAI – https://platform.openai.com/api-keys (pago, fallback final)
    openAI: '',          // OPENAI_API_KEY
  },
  apis: {
    pubmed: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',

    // Google AI Studio – Gemini 2.0 Flash (mais capaz no free tier)
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

    // OpenRouter (compatível com OpenAI SDK)
    openRouter: 'https://openrouter.ai/api/v1/chat/completions',

    // SiliconFlow (compatível com OpenAI SDK)
    siliconFlow: 'https://api.siliconflow.cn/v1/chat/completions',
    siliconFlowImage: 'https://api.siliconflow.cn/v1/images/generations',

    // Groq (compatível com OpenAI SDK, extremamente rápido)
    groq: 'https://api.groq.com/openai/v1/chat/completions',

    // OpenAI
    openAI: 'https://api.openai.com/v1/chat/completions',
    openAIImage: 'https://api.openai.com/v1/images/generations',
  },
  // Modelos preferidos por provedor
  models: {
    gemini: 'gemini-2.0-flash',                           // Google AI Studio
    openRouter: 'deepseek/deepseek-r1:free',              // OpenRouter free
    openRouterAlt: 'meta-llama/llama-3.3-70b-instruct:free',
    siliconFlow: 'Qwen/Qwen2.5-72B-Instruct',            // SiliconFlow free
    siliconFlowAlt: 'deepseek-ai/DeepSeek-V3',
    siliconFlowImage: 'black-forest-labs/FLUX.1-schnell', // SiliconFlow imagem
    groq: 'llama-3.3-70b-versatile',                     // Groq free
    openAI: 'gpt-4o-mini',                               // OpenAI mais barato
    openAIImage: 'dall-e-3',
  }
};
