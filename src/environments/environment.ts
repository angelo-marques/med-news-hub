export const environment = {
  production: false,
  appName: 'Vexlyn News',
  apiKeys: {
    gemini: '',        // Set via GEMINI_API_KEY env var or .env.local
    huggingFace: '',   // Set via HF_API_KEY
    openRouter: '',    // Set via OPENROUTER_API_KEY
    aimlapi: '',       // Set via AIMLAPI_KEY
    ideogram: '',      // Set via IDEOGRAM_API_KEY
    replicate: '',     // Set via REPLICATE_API_KEY
  },
  apis: {
    pubmed: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    huggingFaceSummarize: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    huggingFaceImage: 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
    openRouter: 'https://openrouter.ai/api/v1/chat/completions',
    aimlapi: 'https://api.aimlapi.com/v1/chat/completions',
    ideogram: 'https://api.ideogram.ai/generate',
    replicate: 'https://api.replicate.com/v1/predictions',
  }
};
