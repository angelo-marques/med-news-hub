#!/usr/bin/env node
/**
 * Vexlyn News – Article Fetch Script
 * Fetches medical research articles from PubMed and generates AI summaries.
 * Runs via GitHub Actions 3x/day or locally via `npm run fetch:articles`.
 */

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────────────────

const CONFIG = {
  articlesPath: path.join(__dirname, '../src/assets/data/articles.json'),
  retryQueuePath: path.join(__dirname, '../scripts/.retry-queue.json'),
  maxNewArticlesPerRun: 60,
  maxArticlesTotal: 200,
  resultsPerTerm: 4,
  forceAI: process.env.FORCE_AI === 'true',
  apiKeys: {
    gemini:      process.env.GEMINI_API_KEY      || '',  // Google AI Studio
    openRouter:  process.env.OPENROUTER_API_KEY  || '',  // OpenRouter free models
    siliconFlow: process.env.SILICONFLOW_API_KEY || '',  // SiliconFlow free tier
    groq:        process.env.GROQ_API_KEY        || '',  // Groq (ultra-rápido, free)
    openAI:      process.env.OPENAI_API_KEY      || '',  // OpenAI (fallback pago)
  },
  pubmedSearchTerms: [
    // Oncologia
    'cancer immunotherapy clinical trial 2025',
    'tumor microenvironment cancer treatment 2025',
    'CAR-T cell therapy leukemia 2025',
    // Cardiologia
    'cardiovascular disease prevention randomized trial 2025',
    'heart failure biomarkers treatment 2025',
    'atrial fibrillation ablation outcomes 2025',
    // Neurologia
    'Alzheimer disease treatment biomarkers 2025',
    'Parkinson disease neuroprotection 2025',
    'stroke thrombectomy outcomes 2025',
    // Genômica
    'CRISPR gene therapy clinical trial 2025',
    'genomic medicine precision oncology 2025',
    // Endocrinologia
    'GLP-1 receptor agonist diabetes obesity 2025',
    'insulin resistance metabolic syndrome 2025',
    // Infectologia
    'infectious disease vaccine efficacy 2025',
    'antimicrobial resistance treatment 2025',
    'sepsis biomarkers outcomes 2025',
    // Imunologia
    'autoimmune disease biologics treatment 2025',
    'vaccine immunogenicity clinical trial 2025',
    // Saúde Mental
    'depression treatment randomized controlled trial 2025',
    'anxiety disorder cognitive behavioral therapy 2025',
    // Farmacologia
    'drug repurposing clinical trial 2025',
    'pharmacokinetics novel therapeutics 2025',
    // Pediatria
    'pediatric oncology treatment outcomes 2025',
    'childhood obesity intervention 2025',
  ],
};

// ─── Category mapping ─────────────────────────────────────────────────────────

const CATEGORY_KEYWORDS = {
  'Oncologia': ['cancer', 'tumor', 'oncology', 'carcinoma', 'leukemia', 'lymphoma', 'chemotherapy', 'immunotherapy'],
  'Cardiologia': ['cardiac', 'cardiovascular', 'heart', 'myocardial', 'atrial', 'coronary', 'hypertension'],
  'Neurologia': ['brain', 'neural', 'alzheimer', 'parkinson', 'stroke', 'dementia', 'neurology', 'cognitive'],
  'Infectologia': ['infection', 'viral', 'bacterial', 'sepsis', 'covid', 'sars', 'hiv', 'antimicrobial'],
  'Genômica': ['genomic', 'genetic', 'crispr', 'gene', 'dna', 'rna', 'sequencing', 'mutation'],
  'Farmacologia': ['drug', 'pharmacology', 'clinical trial', 'therapeutic', 'pharmacokinetics'],
  'Saúde Mental': ['mental health', 'depression', 'anxiety', 'psychiatric', 'psychological', 'microbiome'],
  'Pediatria': ['pediatric', 'children', 'infant', 'neonatal', 'childhood'],
  'Imunologia': ['immune', 'immunology', 'autoimmune', 'vaccine', 'antibody', 'cytokine'],
  'Endocrinologia': ['diabetes', 'insulin', 'thyroid', 'endocrine', 'hormone', 'metabolic', 'obesity'],
};

// ─── HTTP helper ──────────────────────────────────────────────────────────────

function httpRequest(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const lib = urlObj.protocol === 'https:' ? https : http;
    const reqOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: options.timeout || 30000,
    };

    const req = lib.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); }
          catch { resolve(data); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.on('error', reject);

    if (body) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      req.write(bodyStr);
    }
    req.end();
  });
}

// ─── PubMed API ───────────────────────────────────────────────────────────────

async function searchPubMed(term, retMax = 5) {
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmax=${retMax}&sort=pub+date&retmode=json&datetype=pdat&mindate=2024/01/01`;
  try {
    const result = await httpRequest(searchUrl);
    return result?.esearchresult?.idlist || [];
  } catch (err) {
    console.warn(`PubMed search failed for "${term}":`, err.message);
    return [];
  }
}

async function fetchPubMedArticle(pmid) {
  // Small delay to respect NCBI rate limits (3 req/s without API key)
  await sleep(350);
  const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&retmode=xml&rettype=abstract`;
  try {
    const xml = await httpRequest(fetchUrl);
    return parsePubMedXML(String(xml), pmid);
  } catch (err) {
    console.warn(`PubMed fetch failed for PMID ${pmid}:`, err.message);
    return null;
  }
}

function parsePubMedXML(xml, pmid) {
  const extract = (tag, text) => {
    const match = text.match(new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 's'));
    return match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
  };
  const extractAll = (tag, text) => {
    const matches = [];
    const re = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 'gs');
    let m;
    while ((m = re.exec(text)) !== null) {
      matches.push(m[1].replace(/<[^>]+>/g, '').trim());
    }
    return matches;
  };

  const title = extract('ArticleTitle', xml);
  if (!title) return null;

  const abstractTexts = extractAll('AbstractText', xml);
  const abstract = abstractTexts.join(' ').substring(0, 1000);

  const lastNames = extractAll('LastName', xml);
  const forenames = extractAll('ForeName', xml);
  const affiliations = extractAll('AffiliationInfo', xml);

  const authors = lastNames.slice(0, 4).map((ln, i) => ({
    name: `${forenames[i] || ''} ${ln}`.trim(),
    affiliation: affiliations[i] || undefined,
  })).filter(a => a.name);

  const journalTitle = extract('Title', xml) || extract('ISOAbbreviation', xml);
  const pubYear = extract('Year', xml) || '2025';
  const pubMonth = extract('Month', xml) || '01';
  const pubDay = extract('Day', xml) || '01';

  const doiMatch = xml.match(/ArticleId IdType="doi"[^>]*>([^<]+)</i);
  const doi = doiMatch ? doiMatch[1].trim() : '';

  const category = inferCategory(title + ' ' + abstract);
  const tags = extractTags(title + ' ' + abstract);

  return {
    id: `pubmed-${pmid}`,
    pmid: String(pmid),
    doi: doi || undefined,
    title,
    titlePt: title, // Will be translated by AI if available
    abstract: abstract || undefined,
    journalisticSummary: undefined,
    imageUrl: undefined,
    imagePlaceholder: true,
    source: 'PubMed',
    sourceUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}`,
    authors: authors.length > 0 ? authors : [{ name: 'Author not available' }],
    journal: journalTitle || undefined,
    publishedDate: `${pubYear}-${String(pubMonth).padStart(2, '0')}-${String(pubDay).padStart(2, '0')}`,
    fetchedDate: new Date().toISOString().split('T')[0],
    category,
    tags,
    isHighlight: false,
    readTime: Math.floor(Math.random() * 8) + 4,
    citationCount: undefined,
    aiProcessed: false,
  };
}

// ─── Category / Tag inference ─────────────────────────────────────────────────

function inferCategory(text) {
  const lower = text.toLowerCase();
  let bestMatch = 'Farmacologia';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = category;
    }
  }
  return bestMatch;
}

function extractTags(text) {
  const allKeywords = Object.values(CATEGORY_KEYWORDS).flat();
  const lower = text.toLowerCase();
  const found = allKeywords.filter(kw => lower.includes(kw));
  return [...new Set(found)].slice(0, 5);
}

// ─── AI Summary Generation ────────────────────────────────────────────────────

function buildPrompt(article) {
  return `Você é um jornalista científico especializado em pesquisa médica. Crie um resumo jornalístico em português brasileiro no seguinte formato:

TÍTULO: [Título impactante e acessível ao público geral]

LEAD: [1-2 frases com a descoberta principal e seu impacto na saúde humana]

CORPO: [3-4 parágrafos com: metodologia do estudo, principais descobertas com dados numéricos reais, citação fictícia plausível de pesquisador, contexto científico]

IMPLICAÇÕES: [O que isso significa para pacientes e médicos? Próximos passos]

FONTE: [${article.source} – DOI: ${article.doi || 'N/A'}]

Baseado no paper: "${article.title}"
Abstract: ${article.abstract || 'Pesquisa médica recente com descobertas significativas.'}

Responda APENAS com o resumo jornalístico em português, sem comentários adicionais.`;
}

/** Google AI Studio – Gemini 2.0 Flash */
async function generateWithGemini(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
  };
  const result = await httpRequest(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    timeout: 20000,
  }, body);
  return result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/** OpenRouter – DeepSeek R1 free / Llama 3.3 70B free */
async function generateWithOpenRouter(prompt, apiKey) {
  const body = {
    model: 'deepseek/deepseek-r1:free',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1500,
    temperature: 0.7,
  };
  const result = await httpRequest('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://vexlyn.news',
      'X-Title': 'Vexlyn News',
    },
    timeout: 30000,
  }, body);
  return result?.choices?.[0]?.message?.content || '';
}

/** SiliconFlow – Qwen2.5-72B (free tier) */
async function generateWithSiliconFlow(prompt, apiKey) {
  const body = {
    model: 'Qwen/Qwen2.5-72B-Instruct',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1500,
    temperature: 0.7,
  };
  const result = await httpRequest('https://api.siliconflow.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    timeout: 25000,
  }, body);
  return result?.choices?.[0]?.message?.content || '';
}

/** Groq – llama-3.3-70b-versatile (free, extremamente rápido) */
async function generateWithGroq(prompt, apiKey) {
  const body = {
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1500,
    temperature: 0.7,
  };
  const result = await httpRequest('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    timeout: 15000,
  }, body);
  return result?.choices?.[0]?.message?.content || '';
}

/** OpenAI – gpt-4o-mini (fallback pago) */
async function generateWithOpenAI(prompt, apiKey) {
  const body = {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1500,
    temperature: 0.7,
  };
  const result = await httpRequest('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    timeout: 20000,
  }, body);
  return result?.choices?.[0]?.message?.content || '';
}

async function generateSummary(article) {
  const prompt = buildPrompt(article);
  const keys = CONFIG.apiKeys;

  // Cascata: Gemini → Groq → OpenRouter → SiliconFlow → OpenAI
  const providers = [
    { name: 'Gemini',      fn: () => generateWithGemini(prompt, keys.gemini),           key: keys.gemini      },
    { name: 'Groq',        fn: () => generateWithGroq(prompt, keys.groq),               key: keys.groq        },
    { name: 'OpenRouter',  fn: () => generateWithOpenRouter(prompt, keys.openRouter),   key: keys.openRouter  },
    { name: 'SiliconFlow', fn: () => generateWithSiliconFlow(prompt, keys.siliconFlow), key: keys.siliconFlow },
    { name: 'OpenAI',      fn: () => generateWithOpenAI(prompt, keys.openAI),           key: keys.openAI      },
  ];

  for (const provider of providers) {
    if (!provider.key) continue;
    try {
      console.log(`  Trying ${provider.name}...`);
      const result = await provider.fn();
      if (result && result.length > 100) {
        console.log(`  ✓ Summary generated via ${provider.name}`);
        return result;
      }
    } catch (err) {
      console.warn(`  ${provider.name} failed: ${err.message}`);
    }
    await sleep(500);
  }

  console.warn('  All AI providers failed – saving without summary.');
  return null;
}

// ─── Retry queue ──────────────────────────────────────────────────────────────

function loadRetryQueue() {
  try {
    if (fs.existsSync(CONFIG.retryQueuePath)) {
      return JSON.parse(fs.readFileSync(CONFIG.retryQueuePath, 'utf8'));
    }
  } catch { /* ignore */ }
  return [];
}

function saveRetryQueue(queue) {
  try {
    fs.writeFileSync(CONFIG.retryQueuePath, JSON.stringify(queue, null, 2));
  } catch (err) {
    console.warn('Could not save retry queue:', err.message);
  }
}

// ─── Deduplication ────────────────────────────────────────────────────────────

function isDuplicate(article, existing) {
  return existing.some(ex =>
    (article.pmid && ex.pmid === article.pmid) ||
    (article.doi && ex.doi === article.doi) ||
    ex.title.toLowerCase() === article.title.toLowerCase()
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadExistingArticles() {
  try {
    if (fs.existsSync(CONFIG.articlesPath)) {
      return JSON.parse(fs.readFileSync(CONFIG.articlesPath, 'utf8'));
    }
  } catch (err) {
    console.warn('Could not load existing articles:', err.message);
  }
  return [];
}

function saveArticles(articles) {
  // Trim to max allowed
  const trimmed = articles.slice(0, CONFIG.maxArticlesTotal);
  fs.writeFileSync(CONFIG.articlesPath, JSON.stringify(trimmed, null, 2));
  console.log(`Saved ${trimmed.length} articles to articles.json`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Vexlyn News – Article Fetch Script ===');
  console.log(`Started: ${new Date().toISOString()}`);
  const k = CONFIG.apiKeys;
  console.log(`AI keys: Gemini=${!!k.gemini}, Groq=${!!k.groq}, OpenRouter=${!!k.openRouter}, SiliconFlow=${!!k.siliconFlow}, OpenAI=${!!k.openAI}`);

  const existingArticles = loadExistingArticles();
  console.log(`Existing articles: ${existingArticles.length}`);

  const retryQueue = loadRetryQueue();
  const newArticles = [];
  const seenPmids = new Set();

  // ── Step 1: Retry pending AI summaries ──
  if (retryQueue.length > 0) {
    console.log(`\nProcessing retry queue (${retryQueue.length} items)...`);
    for (const articleId of retryQueue.slice(0, 5)) {
      const article = existingArticles.find(a => a.id === articleId);
      if (article && !article.aiProcessed) {
        console.log(`Retrying AI for: ${article.title.substring(0, 60)}...`);
        const summary = await generateSummary(article);
        if (summary) {
          article.journalisticSummary = summary;
          article.aiProcessed = true;
          retryQueue.splice(retryQueue.indexOf(articleId), 1);
        }
        await sleep(1000);
      } else {
        retryQueue.splice(retryQueue.indexOf(articleId), 1);
      }
    }
    saveRetryQueue(retryQueue);
  }

  // ── Step 2: Fetch new articles ──
  console.log('\nFetching new articles from PubMed...');
  let fetchedCount = 0;

  for (const term of CONFIG.pubmedSearchTerms) {
    if (fetchedCount >= CONFIG.maxNewArticlesPerRun) break;

    console.log(`\nSearching: "${term}"`);
    const pmids = await searchPubMed(term, CONFIG.resultsPerTerm);
    console.log(`  Found ${pmids.length} PMIDs: ${pmids.join(', ')}`);

    for (const pmid of pmids) {
      if (fetchedCount >= CONFIG.maxNewArticlesPerRun) break;
      if (seenPmids.has(pmid)) continue;
      seenPmids.add(pmid);

      const article = await fetchPubMedArticle(pmid);
      if (!article) continue;
      if (isDuplicate(article, [...existingArticles, ...newArticles])) {
        console.log(`  Skipping duplicate: PMID ${pmid}`);
        continue;
      }

      console.log(`  New article: "${article.title.substring(0, 60)}..."`);

      // Try AI summary
      const summary = await generateSummary(article);
      if (summary) {
        article.journalisticSummary = summary;
        article.aiProcessed = true;
      } else {
        retryQueue.push(article.id);
      }

      newArticles.push(article);
      fetchedCount++;
      await sleep(1000);
    }
  }

  // ── Step 3: Merge and save ──
  if (newArticles.length > 0 || CONFIG.forceAI) {
    const merged = [...newArticles, ...existingArticles];
    saveArticles(merged);
    console.log(`\nAdded ${newArticles.length} new articles.`);
  } else {
    console.log('\nNo new articles found.');
    // Still save to persist any retry updates
    if (retryQueue.length < loadRetryQueue().length) {
      saveArticles(existingArticles);
    }
  }

  saveRetryQueue(retryQueue);

  console.log(`\n=== Done: ${new Date().toISOString()} ===`);
  console.log(`Total articles: ${loadExistingArticles().length}`);
  console.log(`Retry queue size: ${retryQueue.length}`);
}

main().catch(err => {
  console.error('Fatal error in fetch-articles.js:', err);
  process.exit(1);
});
