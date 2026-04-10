import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Article, ArticleCategory, ArticleSource } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly http = inject(HttpClient);

  readonly articles = signal<Article[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<ArticleCategory | null>(null);
  readonly selectedSource = signal<ArticleSource | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = signal(12);

  readonly filteredArticles = computed(() => {
    let result = this.articles();
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    const source = this.selectedSource();

    if (query) {
      result = result.filter(a =>
        a.titlePt.toLowerCase().includes(query) ||
        a.title.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query)) ||
        (a.journalisticSummary?.toLowerCase().includes(query) ?? false) ||
        a.authors.some(au => au.name.toLowerCase().includes(query))
      );
    }
    if (category) result = result.filter(a => a.category === category);
    if (source) result = result.filter(a => a.source === source);
    return result.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  });

  readonly highlightedArticles = computed(() =>
    this.articles().filter(a => a.isHighlight).slice(0, 5)
  );

  readonly paginatedArticles = computed(() => {
    const all = this.filteredArticles();
    const page = this.currentPage();
    const size = this.pageSize();
    return all.slice((page - 1) * size, page * size);
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.filteredArticles().length / this.pageSize())
  );

  readonly aiProcessedCount = computed(() =>
    this.articles().filter(a => a.aiProcessed).length
  );

  loadArticles(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Article[]>('assets/data/articles.json').pipe(
      catchError(_err => {
        this.error.set('Erro ao carregar artigos. Tentando novamente...');
        return of([]);
      })
    ).subscribe(articles => {
      this.articles.set(articles);
      this.loading.set(false);
    });
  }

  getArticleById(id: string): Article | undefined {
    return this.articles().find(a => a.id === id);
  }

  searchWithAI(_query: string): Observable<Article[]> {
    // Fallback to local filter while AI is not configured
    return of(this.filteredArticles());
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  setCategory(cat: ArticleCategory | null): void {
    this.selectedCategory.set(cat);
    this.currentPage.set(1);
  }

  setSource(src: ArticleSource | null): void {
    this.selectedSource.set(src);
    this.currentPage.set(1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }
}
