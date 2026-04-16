# Vexlyn News

> Portal de jornalismo científico médico alimentado por inteligência artificial — Angular 21 + GitHub Pages

[![Deploy](https://github.com/angelo-marques/med-news-hub/actions/workflows/vexlyn.yml/badge.svg)](https://github.com/angelo-marques/med-news-hub/actions/workflows/vexlyn.yml)
[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)](https://angular.dev)
[![Angular Material](https://img.shields.io/badge/Material-M3-757de8?logo=angular)](https://material.angular.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)

**Vexlyn News** converte automaticamente papers científicos do PubMed em resumos jornalísticos em português brasileiro, utilizando uma cascata de IAs generativas. O conteúdo é atualizado três vezes ao dia via GitHub Actions e publicado no GitHub Pages sem nenhum servidor.

---

## Demonstração

**Site:** [angelo-marques.github.io/med-news-hub](https://angelo-marques.github.io/med-news-hub/)

---

## Funcionalidades

- **Hero Slider** com autoplay de 6s exibindo os artigos em destaque
- **Breaking news ticker** animado com os títulos mais recentes
- **Grid paginado** de artigos com 12 itens por página
- **Busca em tempo real** por título, autor, tags e resumo (no header e na sidebar)
- **Filtros** por categoria médica e por fonte científica
- **Página de detalhes** com resumo jornalístico completo gerado por IA
- **Modo escuro / claro** com toggle no header e persistência via localStorage
- **Design responsivo** mobile-first com Tailwind CSS
- **Acessibilidade** com roles ARIA e navegação por teclado

---

## Arquitetura

```
med-news-hub/
├── .github/
│   └── workflows/
│       └── vexlyn.yml          # CI/CD: fetch (3x/dia) + deploy automático
├── scripts/
│   └── fetch-articles.js       # Script Node.js: PubMed + resumos de IA
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── article-card/   # Card reutilizável de artigo
│   │   │   ├── header/         # Header fixo com nav, busca e tema
│   │   │   ├── hero-slider/    # Carrossel de artigos em destaque
│   │   │   └── sidebar/        # Filtros de categoria, fonte e busca
│   │   ├── models/
│   │   │   └── article.model.ts  # Interfaces Article, ArticleState, MEDICAL_SOURCES
│   │   ├── pages/
│   │   │   ├── home/           # Página inicial (slider + grid + sidebar)
│   │   │   ├── articles/       # Listagem completa paginada
│   │   │   ├── article-detail/ # Detalhe do artigo com resumo de IA
│   │   │   └── sources/        # Catálogo das 9 fontes científicas
│   │   ├── services/
│   │   │   ├── article.service.ts  # Estado global (signals), filtragem, paginação
│   │   │   ├── ai.service.ts       # Cascata de IAs (resumos + imagens)
│   │   │   └── theme.service.ts    # Alternância e persistência de tema
│   │   ├── app.routes.ts       # Rotas lazy-load
│   │   └── app.config.ts       # Providers (HttpClient, Router, Animations)
│   ├── assets/
│   │   ├── data/
│   │   │   └── articles.json   # Base local de artigos (atualizada pelo CI)
│   │   └── logo.svg            # Logotipo Vexlyn News
│   ├── environments/
│   │   ├── environment.ts      # Dev: chaves de API locais
│   │   └── environment.prod.ts # Prod: chaves via variáveis de ambiente
│   └── styles.scss             # Material M3 theme + Tailwind + CSS custom properties
├── angular.json
├── package.json
└── tailwind.config.js
```

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | Angular 21 (standalone components, signals, OnPush) |
| UI | Angular Material M3 + Tailwind CSS 3 |
| Estado | Angular Signals (`signal`, `computed`, `effect`) |
| Roteamento | Angular Router com lazy loading |
| HTTP | `HttpClient` com `inject()` |
| Estilo | SCSS + CSS custom properties (tema claro/escuro) |
| Build | `@angular-devkit/build-angular:application` (esbuild) |
| TypeScript | 5.9 |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages (`gh-pages` branch) |

---

## Fontes Científicas

O portal agrega conteúdo das 9 principais bases de dados médicas:

| Fonte | Descrição |
|---|---|
| **PubMed** | Base de dados biomédica do NCBI (>35 M citações) |
| **PubMed Central (PMC)** | Repositório de acesso aberto do NCBI |
| **Embase** | Base farmacológica e biomédica da Elsevier |
| **Cochrane Library** | Revisões sistemáticas baseadas em evidências |
| **Scopus** | Maior base de resumos e citações peer-reviewed |
| **NEJM** | New England Journal of Medicine |
| **The Lancet** | Revista médica britânica fundada em 1823 |
| **JAMA Network** | American Medical Association |
| **The BMJ** | British Medical Journal |

---

## Categorias Médicas

`Oncologia` · `Cardiologia` · `Neurologia` · `Infectologia` · `Genômica` · `Farmacologia` · `Saúde Mental` · `Pediatria` · `Imunologia` · `Endocrinologia`

---

## Pipeline de IA

### Resumos Jornalísticos

O script de busca e o serviço frontend utilizam uma cascata de provedores de IA. Se um provedor falhar ou não tiver chave configurada, o próximo é tentado automaticamente:

```
1. Google Gemini 2.0 Flash   (Google AI Studio – gratuito)
2. Groq llama-3.3-70b        (ultra-rápido – gratuito)
3. OpenRouter DeepSeek-R1    (modelos gratuitos via OpenRouter)
4. SiliconFlow Qwen2.5-72B   (tier gratuito)
5. OpenAI gpt-4o-mini        (fallback pago – mais barato)
```

O prompt instrui o modelo a produzir um artigo jornalístico em português com: **Título impactante → Lead → Corpo (metodologia + dados + citação do autor) → Implicações clínicas → Fonte com DOI**.

### Geração de Imagens

```
1. SiliconFlow FLUX.1-schnell  (512×512 – gratuito)
2. OpenAI DALL-E 3             (1792×1024 – pago)
3. Placeholder via placehold.co (fallback sem API)
```

### Retry Queue

Artigos que falharam no processamento de IA são adicionados a uma fila persistida em `localStorage` (frontend) ou em `.retry-queue.json` (script CI) e reprocessados na próxima execução.

---

## Modelo de Dados

```typescript
interface Article {
  id: string;
  pmid?: string;
  doi?: string;
  title: string;                 // Título original (inglês)
  titlePt: string;               // Título traduzido para português
  abstract?: string;             // Abstract original
  journalisticSummary?: string;  // Resumo jornalístico gerado por IA
  imageUrl?: string;             // Imagem gerada por IA
  imagePlaceholder?: boolean;
  source: ArticleSource;         // 'PubMed' | 'PMC' | 'NEJM' | ...
  sourceUrl: string;
  authors: ArticleAuthor[];
  journal?: string;
  publishedDate: string;         // ISO 8601
  fetchedDate: string;
  category: ArticleCategory;     // 'Oncologia' | 'Cardiologia' | ...
  tags: string[];
  isHighlight?: boolean;         // Aparece no hero slider
  readTime?: number;             // Minutos estimados de leitura
  citationCount?: number;
  aiProcessed: boolean;
  aiProcessingError?: string;
}
```

---

## CI/CD — GitHub Actions

O arquivo `.github/workflows/vexlyn.yml` define dois jobs:

### Job `fetch` — Busca de Artigos

Executa: **schedule (3x/dia)** | **workflow_dispatch manual**

1. Chama a API E-utilities do NCBI (PubMed) com 24 termos de busca médica
2. Gera resumos jornalísticos em português via cascata de IA
3. Gera imagens para cada artigo
4. Atualiza `src/assets/data/articles.json`
5. Faz commit e push apenas se o arquivo mudou

Horários (UTC): `06:00` · `14:00` · `22:00` (03h · 11h · 19h BRT)

### Job `deploy` — Build e Deploy

Executa: **push para main** | **após fetch com mudanças** | **force_deploy manual**

1. `npm install --legacy-peer-deps`
2. `ng build --configuration production --base-href /<repo>/`
3. Copia `index.html → 404.html` (fix para SPA routing no GitHub Pages)
4. Publica na branch `gh-pages` via `peaceiris/actions-gh-pages@v4`

### Inputs Manuais (`workflow_dispatch`)

| Input | Padrão | Descrição |
|---|---|---|
| `run_fetch` | `true` | Buscar novos artigos do PubMed |
| `force_ai` | `false` | Reprocessar resumos de IA nos artigos existentes |
| `force_deploy` | `false` | Forçar deploy mesmo sem mudanças |

---

## Configuração Local

### Pré-requisitos

- Node.js 20+
- Angular CLI 21+

### Instalação

```bash
git clone https://github.com/angelo-marques/med-news-hub.git
cd med-news-hub
npm install --legacy-peer-deps
```

### Desenvolvimento

```bash
npm start          # ng serve --open  →  http://localhost:4200
```

### Build de Produção

```bash
npm run build:prod
```

### Buscar Artigos Localmente

```bash
# Configure as chaves de API (pelo menos uma)
export GEMINI_API_KEY="sua-chave"
export GROQ_API_KEY="sua-chave"

npm run fetch:articles
```

---

## Variáveis de Ambiente / GitHub Secrets

Configure em **Settings → Secrets and variables → Actions**:

| Secret | Provedor | Obrigatório |
|---|---|---|
| `GEMINI_API_KEY` | Google AI Studio | Recomendado (gratuito) |
| `GROQ_API_KEY` | Groq | Recomendado (gratuito) |
| `OPENROUTER_API_KEY` | OpenRouter | Opcional (gratuito) |
| `SILICONFLOW_API_KEY` | SiliconFlow | Opcional (gratuito) |
| `OPENAI_API_KEY` | OpenAI | Opcional (pago, fallback) |

Basta configurar pelo menos uma chave — a cascata garante que os demais provedores sejam pulados.

---

## GitHub Pages — Configuração Inicial

Após o primeiro deploy:

1. Acesse **Settings → Pages**
2. Em **Branch**, selecione `gh-pages` → `/ (root)`
3. Clique em **Save**

O site ficará disponível em `https://<usuario>.github.io/med-news-hub/`.

> O fix de SPA routing (cópia de `index.html → 404.html`) já está incluído no workflow, garantindo que rotas como `/artigos/123` funcionem ao acessar diretamente.

---

## Rotas da Aplicação

| Rota | Página | Descrição |
|---|---|---|
| `/` | Redirect | Redireciona para `/home` |
| `/home` | Home | Hero slider + grid de artigos + sidebar |
| `/artigos` | Artigos | Listagem completa paginada com filtros |
| `/artigos/:id` | Detalhe | Resumo jornalístico completo + metadados |
| `/fontes` | Fontes | Catálogo das 9 fontes científicas |
| `/**` | Redirect | Qualquer rota inválida volta para `/home` |

---

## Licença

MIT © Angelo Marques
