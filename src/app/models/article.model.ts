export type ArticleSource = 'PubMed' | 'PMC' | 'Embase' | 'Cochrane' | 'Scopus' | 'NEJM' | 'Lancet' | 'JAMA' | 'BMJ';
export type ArticleCategory = 'Oncologia' | 'Cardiologia' | 'Neurologia' | 'Infectologia' | 'Genômica' | 'Farmacologia' | 'Saúde Mental' | 'Pediatria' | 'Imunologia' | 'Endocrinologia';

export interface ArticleAuthor {
  name: string;
  affiliation?: string;
}

export interface Article {
  id: string;
  pmid?: string;
  doi?: string;
  title: string;                   // Original title (English)
  titlePt: string;                 // Portuguese translated title
  abstract?: string;               // Original abstract
  journalisticSummary?: string;    // AI-generated journalistic summary in Portuguese
  imageUrl?: string;               // AI-generated image URL
  imagePlaceholder?: boolean;      // True if using placeholder
  source: ArticleSource;
  sourceUrl: string;
  authors: ArticleAuthor[];
  journal?: string;
  publishedDate: string;           // ISO date string
  fetchedDate: string;             // When we fetched it
  category: ArticleCategory;
  tags: string[];
  isHighlight?: boolean;           // Featured in hero slider
  readTime?: number;               // Estimated minutes
  citationCount?: number;
  aiProcessed: boolean;
  aiProcessingError?: string;
}

export interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  selectedCategory: ArticleCategory | null;
  selectedSource: ArticleSource | null;
  searchQuery: string;
}

export const MEDICAL_SOURCES: { id: ArticleSource; name: string; url: string; description: string; color: string }[] = [
  { id: 'PubMed', name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', description: 'Base de dados biomédica do NCBI com mais de 35 milhões de citações', color: '#1976D2' },
  { id: 'PMC', name: 'PubMed Central', url: 'https://pmc.ncbi.nlm.nih.gov', description: 'Repositório de acesso aberto de literatura biomédica', color: '#0288D1' },
  { id: 'Embase', name: 'Embase', url: 'https://www.embase.com', description: 'Base de dados farmacológica e biomédica Elsevier', color: '#E65100' },
  { id: 'Cochrane', name: 'Cochrane Library', url: 'https://www.cochranelibrary.com', description: 'Revisões sistemáticas de alta qualidade para saúde baseada em evidências', color: '#00838F' },
  { id: 'Scopus', name: 'Scopus', url: 'https://www.scopus.com', description: 'Maior base de dados de resumos e citações de literatura peer-reviewed', color: '#6A1B9A' },
  { id: 'NEJM', name: 'New England Journal of Medicine', url: 'https://www.nejm.org', description: 'Uma das revistas médicas mais prestigiadas do mundo', color: '#B71C1C' },
  { id: 'Lancet', name: 'The Lancet', url: 'https://www.thelancet.com', description: 'Revista médica britânica de alto impacto fundada em 1823', color: '#1B5E20' },
  { id: 'JAMA', name: 'JAMA Network', url: 'https://jamanetwork.com', description: 'Rede de publicações da American Medical Association', color: '#37474F' },
  { id: 'BMJ', name: 'The BMJ', url: 'https://www.bmj.com', description: 'British Medical Journal – líder global em pesquisa clínica', color: '#0D47A1' },
];
