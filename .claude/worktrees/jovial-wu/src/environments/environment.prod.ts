export const environment = {
  production: true,
  appName: 'Vexlyn News',
  developerName: 'Angelo Marques',
  apiKeys: {
    gemini: '',       // GEMINI_API_KEY
    openRouter: '',   // OPENROUTER_API_KEY
    siliconFlow: '',  // SILICONFLOW_API_KEY
    groq: '',         // GROQ_API_KEY
    openAI: '',       // OPENAI_API_KEY
  },
  apis: {
    pubmed: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    openRouter: 'https://openrouter.ai/api/v1/chat/completions',
    siliconFlow: 'https://api.siliconflow.cn/v1/chat/completions',
    siliconFlowImage: 'https://api.siliconflow.cn/v1/images/generations',
    groq: 'https://api.groq.com/openai/v1/chat/completions',
    openAI: 'https://api.openai.com/v1/chat/completions',
    openAIImage: 'https://api.openai.com/v1/images/generations',
  },
  models: {
    gemini: 'gemini-2.0-flash',
    openRouter: 'deepseek/deepseek-r1:free',
    openRouterAlt: 'meta-llama/llama-3.3-70b-instruct:free',
    siliconFlow: 'Qwen/Qwen2.5-72B-Instruct',
    siliconFlowAlt: 'deepseek-ai/DeepSeek-V3',
    siliconFlowImage: 'black-forest-labs/FLUX.1-schnell',
    groq: 'llama-3.3-70b-versatile',
    openAI: 'gpt-4o-mini',
    openAIImage: 'dall-e-3',
  }
};
