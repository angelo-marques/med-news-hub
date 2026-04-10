import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from, firstValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article } from '../models/article.model';

export interface AiProvider { name: string; available: boolean; requestsRemaining?: number; }

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly http = inject(HttpClient);

  readonly providers = signal<AiProvider[]>([
    { name: 'Gemini', available: true },
    { name: 'HuggingFace', available: true },
    { name: 'OpenRouter', available: true },
    { name: 'AIMLAPI', available: true },
  ]);

  readonly isProcessing = signal(false);
  readonly retryQueue = signal<string[]>(this.loadRetryQueue());

  generateJournalisticSummary(article: Partial<Article>): Observable<string> {
    this.isProcessing.set(true);
    const prompt = this.buildSummaryPrompt(article);

    return from(this.trySummaryProviders(prompt, article.id || '')).pipe(
      catchError(() => {
        this.addToRetryQueue(article.id || '');
        return of(this.generateFallbackSummary(article));
      })
    );
  }

  generateImage(topic: string, source: string, articleId: string): Observable<string> {
    const prompt = `Realistic screenshot of a medical research paper about ${topic} from ${source}, scientific journal interface, high quality, professional medical imagery`;
    return from(this.tryImageProviders(prompt, articleId)).pipe(
      catchError(() => of(this.getPlaceholderImage(topic)))
    );
  }

  private buildSummaryPrompt(article: Partial<Article>): string {
    return `Você é um jornalista científico especializado em pesquisa médica. Crie um resumo jornalístico em português brasileiro no seguinte formato:

TÍTULO: [Título impactante e acessível ao público geral]

LEAD: [1-2 frases com a descoberta principal e seu impacto na saúde humana]

CORPO: [3-4 parágrafos com: metodologia do estudo, principais descobertas com dados numéricos reais, citação do autor principal, contexto científico]

IMPLICAÇÕES: [O que isso significa para pacientes e médicos? Próximos passos]

FONTE: [Cite: ${article.source}: DOI ${article.doi || 'N/A'}]

Baseado no paper: "${article.title || article.titlePt}"
Abstract: ${article.abstract || 'Pesquisa médica recente com descobertas significativas para a área'}

Responda APENAS com o resumo jornalístico, sem comentários adicionais.`;
  }

  private async trySummaryProviders(prompt: string, articleId: string): Promise<string> {
    // Try Gemini first
    if (environment.apiKeys.gemini) {
      try {
        const result = await this.callGemini(prompt);
        if (result) { this.isProcessing.set(false); return result; }
      } catch { this.markProviderUnavailable('Gemini'); }
    }

    // Try HuggingFace
    if (environment.apiKeys.huggingFace) {
      try {
        const result = await this.callHuggingFaceSummarize(prompt);
        if (result) { this.isProcessing.set(false); return result; }
      } catch { this.markProviderUnavailable('HuggingFace'); }
    }

    // Try OpenRouter
    if (environment.apiKeys.openRouter) {
      try {
        const result = await this.callOpenRouter(prompt);
        if (result) { this.isProcessing.set(false); return result; }
      } catch { this.markProviderUnavailable('OpenRouter'); }
    }

    // Try AIMLAPI
    if (environment.apiKeys.aimlapi) {
      try {
        const result = await this.callAIMLAPI(prompt);
        if (result) { this.isProcessing.set(false); return result; }
      } catch { this.markProviderUnavailable('AIMLAPI'); }
    }

    this.isProcessing.set(false);
    this.addToRetryQueue(articleId);
    throw new Error('All AI providers exhausted');
  }

  private async callGemini(prompt: string): Promise<string> {
    const url = `${environment.apis.gemini}?key=${environment.apiKeys.gemini}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1500 }
    };
    const response = await firstValueFrom(
      this.http.post<any>(url, body).pipe(timeout(15000))
    );
    return response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  private async callHuggingFaceSummarize(prompt: string): Promise<string> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.apiKeys.huggingFace}` });
    const body = { inputs: prompt.substring(0, 1024), parameters: { max_length: 500, min_length: 200 } };
    const response = await firstValueFrom(
      this.http.post<any>(environment.apis.huggingFaceSummarize, body, { headers }).pipe(timeout(30000))
    );
    return Array.isArray(response) ? response[0]?.summary_text || '' : '';
  }

  private async callOpenRouter(prompt: string): Promise<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKeys.openRouter}`,
      'HTTP-Referer': 'https://vexlyn.news',
      'X-Title': 'Vexlyn News'
    });
    const body = {
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500
    };
    const response = await firstValueFrom(
      this.http.post<any>(environment.apis.openRouter, body, { headers }).pipe(timeout(20000))
    );
    return response?.choices?.[0]?.message?.content || '';
  }

  private async callAIMLAPI(prompt: string): Promise<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKeys.aimlapi}`,
      'Content-Type': 'application/json'
    });
    const body = {
      model: 'google/gemma-3-27b-it',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500
    };
    const response = await firstValueFrom(
      this.http.post<any>(environment.apis.aimlapi, body, { headers }).pipe(timeout(20000))
    );
    return response?.choices?.[0]?.message?.content || '';
  }

  private async tryImageProviders(prompt: string, articleId: string): Promise<string> {
    // HuggingFace Flux (free)
    if (environment.apiKeys.huggingFace) {
      try {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.apiKeys.huggingFace}` });
        const body = { inputs: prompt };
        const blob = await firstValueFrom(
          this.http.post(environment.apis.huggingFaceImage, body, { headers, responseType: 'blob' }).pipe(timeout(60000))
        );
        return URL.createObjectURL(blob);
      } catch { /* try next */ }
    }

    // AIMLAPI image generation
    if (environment.apiKeys.aimlapi) {
      try {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${environment.apiKeys.aimlapi}`,
          'Content-Type': 'application/json'
        });
        const body = { model: 'flux/schnell', prompt, n: 1, size: '1024x576' };
        const response = await firstValueFrom(
          this.http.post<any>('https://api.aimlapi.com/v1/images/generations', body, { headers }).pipe(timeout(60000))
        );
        return response?.data?.[0]?.url || this.getPlaceholderImage(prompt);
      } catch { /* try next */ }
    }

    this.addToRetryQueue(`img_${articleId}`);
    return this.getPlaceholderImage(prompt);
  }

  getPlaceholderImage(topic: string): string {
    const encoded = encodeURIComponent(topic.substring(0, 50));
    return `https://placehold.co/1200x630/1976D2/FFFFFF?text=${encoded}`;
  }

  private generateFallbackSummary(article: Partial<Article>): string {
    return `**${article.titlePt || article.title}**\n\nPesquisadores publicaram um novo estudo de grande relevância para a medicina moderna. Os resultados, divulgados na revista ${article.journal || article.source}, trazem descobertas que podem impactar significativamente a prática clínica.\n\nO estudo, conduzido por uma equipe internacional, analisou dados de pacientes e identificou padrões relevantes para o tratamento e prevenção de condições relacionadas ao tema investigado.\n\n*Resumo gerado automaticamente – versão detalhada em processamento.*\n\n[Fonte: ${article.source} – DOI: ${article.doi || 'N/A'}]`;
  }

  private markProviderUnavailable(name: string): void {
    this.providers.update(providers =>
      providers.map(p => p.name === name ? { ...p, available: false } : p)
    );
  }

  private loadRetryQueue(): string[] {
    try { return JSON.parse(localStorage.getItem('vexlyn-retry-queue') || '[]'); }
    catch { return []; }
  }

  private addToRetryQueue(id: string): void {
    this.retryQueue.update(q => {
      const updated = [...new Set([...q, id])];
      localStorage.setItem('vexlyn-retry-queue', JSON.stringify(updated));
      return updated;
    });
  }

  clearRetryQueue(): void {
    this.retryQueue.set([]);
    localStorage.removeItem('vexlyn-retry-queue');
  }
}
