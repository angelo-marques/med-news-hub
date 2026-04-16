import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from, firstValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article } from '../models/article.model';

export interface AiProvider {
  name: string;
  available: boolean;
  requestsRemaining?: number;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly http = inject(HttpClient);

  readonly providers = signal<AiProvider[]>([
    { name: 'Gemini',      available: true },
    { name: 'Groq',        available: true },
    { name: 'OpenRouter',  available: true },
    { name: 'SiliconFlow', available: true },
    { name: 'OpenAI',      available: true },
  ]);

  readonly isProcessing = signal(false);
  readonly retryQueue = signal<string[]>(this.loadRetryQueue());

  // ─── Public API ────────────────────────────────────────────────────────────

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
    const prompt = `High-quality scientific journal screenshot about: ${topic}. Source: ${source}. Medical research, professional layout, data visualization, no text overlay.`;
    return from(this.tryImageProviders(prompt, articleId)).pipe(
      catchError(() => of(this.getPlaceholderImage(topic)))
    );
  }

  // ─── Summary cascade: Gemini → Groq → OpenRouter → SiliconFlow → OpenAI ──

  private async trySummaryProviders(prompt: string, articleId: string): Promise<string> {
    const { apiKeys } = environment;

    const providers: { name: string; key: string; fn: () => Promise<string> }[] = [
      {
        name: 'Gemini',
        key: apiKeys.gemini,
        fn: () => this.callGemini(prompt),
      },
      {
        name: 'Groq',
        key: apiKeys.groq,
        fn: () => this.callGroq(prompt),
      },
      {
        name: 'OpenRouter',
        key: apiKeys.openRouter,
        fn: () => this.callOpenRouter(prompt),
      },
      {
        name: 'SiliconFlow',
        key: apiKeys.siliconFlow,
        fn: () => this.callSiliconFlow(prompt),
      },
      {
        name: 'OpenAI',
        key: apiKeys.openAI,
        fn: () => this.callOpenAI(prompt),
      },
    ];

    for (const provider of providers) {
      if (!provider.key) continue;
      try {
        const result = await provider.fn();
        if (result && result.length > 80) {
          this.isProcessing.set(false);
          return result;
        }
      } catch {
        this.markProviderUnavailable(provider.name);
      }
    }

    this.isProcessing.set(false);
    this.addToRetryQueue(articleId);
    throw new Error('All AI providers exhausted');
  }

  // ─── Image cascade: SiliconFlow → OpenAI DALL-E → placeholder ─────────────

  private async tryImageProviders(prompt: string, articleId: string): Promise<string> {
    const { apiKeys } = environment;

    // SiliconFlow – Flux Schnell (free tier)
    if (apiKeys.siliconFlow) {
      try {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${apiKeys.siliconFlow}`,
          'Content-Type': 'application/json',
        });
        const body = {
          model: environment.models.siliconFlowImage,
          prompt,
          n: 1,
          image_size: '1024x576',
        };
        const res = await firstValueFrom(
          this.http.post<any>(environment.apis.siliconFlowImage, body, { headers }).pipe(timeout(60000))
        );
        const url = res?.images?.[0]?.url || res?.data?.[0]?.url;
        if (url) return url;
      } catch { /* try next */ }
    }

    // OpenAI DALL-E 3
    if (apiKeys.openAI) {
      try {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${apiKeys.openAI}`,
          'Content-Type': 'application/json',
        });
        const body = {
          model: environment.models.openAIImage,
          prompt: prompt.substring(0, 1000),
          n: 1,
          size: '1792x1024',
          quality: 'standard',
        };
        const res = await firstValueFrom(
          this.http.post<any>(environment.apis.openAIImage, body, { headers }).pipe(timeout(60000))
        );
        const url = res?.data?.[0]?.url;
        if (url) return url;
      } catch { /* fall through */ }
    }

    this.addToRetryQueue(`img_${articleId}`);
    return this.getPlaceholderImage(prompt);
  }

  // ─── Provider implementations ───────────────────────────────────────────────

  /** Google AI Studio – Gemini 2.0 Flash */
  private async callGemini(prompt: string): Promise<string> {
    const url = `${environment.apis.gemini}?key=${environment.apiKeys.gemini}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
    };
    const res = await firstValueFrom(
      this.http.post<any>(url, body).pipe(timeout(15000))
    );
    return res?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  /** Groq – llama-3.3-70b-versatile (free, extremamente rápido) */
  private async callGroq(prompt: string): Promise<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKeys.groq}`,
      'Content-Type': 'application/json',
    });
    const body = {
      model: environment.models.groq,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    };
    const res = await firstValueFrom(
      this.http.post<any>(environment.apis.groq, body, { headers }).pipe(timeout(15000))
    );
    return res?.choices?.[0]?.message?.content || '';
  }

  /** OpenRouter – DeepSeek R1 free / Llama 3.3 70B free */
  private async callOpenRouter(prompt: string): Promise<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKeys.openRouter}`,
      'HTTP-Referer': 'https://vexlyn.news',
      'X-Title': 'Vexlyn News',
      'Content-Type': 'application/json',
    });
    const body = {
      model: environment.models.openRouter,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    };
    const res = await firstValueFrom(
      this.http.post<any>(environment.apis.openRouter, body, { headers }).pipe(timeout(25000))
    );
    // Se o modelo primário falhar, tenta alternativo automaticamente via OpenRouter
    return res?.choices?.[0]?.message?.content || '';
  }

  /** SiliconFlow – Qwen2.5-72B / DeepSeek-V3 (free tier) */
  private async callSiliconFlow(prompt: string): Promise<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKeys.siliconFlow}`,
      'Content-Type': 'application/json',
    });
    const body = {
      model: environment.models.siliconFlow,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    };
    const res = await firstValueFrom(
      this.http.post<any>(environment.apis.siliconFlow, body, { headers }).pipe(timeout(25000))
    );
    return res?.choices?.[0]?.message?.content || '';
  }

  /** OpenAI – gpt-4o-mini (fallback pago, mais barato) */
  private async callOpenAI(prompt: string): Promise<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKeys.openAI}`,
      'Content-Type': 'application/json',
    });
    const body = {
      model: environment.models.openAI,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    };
    const res = await firstValueFrom(
      this.http.post<any>(environment.apis.openAI, body, { headers }).pipe(timeout(20000))
    );
    return res?.choices?.[0]?.message?.content || '';
  }

  // ─── Helpers ────────────────────────────────────────────────────────────────

  private buildSummaryPrompt(article: Partial<Article>): string {
    return `Você é um jornalista científico especializado em pesquisa médica. Crie um resumo jornalístico em português brasileiro no seguinte formato:

TÍTULO: [Título impactante e acessível ao público geral]

LEAD: [1-2 frases com a descoberta principal e seu impacto na saúde humana]

CORPO: [3-4 parágrafos com: metodologia do estudo, principais descobertas com dados numéricos reais, citação do autor principal, contexto científico]

IMPLICAÇÕES: [O que isso significa para pacientes e médicos? Próximos passos]

FONTE: [${article.source}: DOI ${article.doi || 'N/A'}]

Baseado no paper: "${article.title || article.titlePt}"
Abstract: ${article.abstract || 'Pesquisa médica recente com descobertas significativas para a área'}

Responda APENAS com o resumo jornalístico, sem comentários adicionais.`;
  }

  private generateFallbackSummary(article: Partial<Article>): string {
    return `**${article.titlePt || article.title}**\n\nPesquisadores publicaram um novo estudo de grande relevância para a medicina moderna. Os resultados, divulgados na revista ${article.journal || article.source}, trazem descobertas que podem impactar significativamente a prática clínica.\n\nO estudo, conduzido por uma equipe internacional, analisou dados de pacientes e identificou padrões relevantes para o tratamento e prevenção de condições relacionadas ao tema investigado.\n\n*Resumo gerado automaticamente – versão detalhada em processamento.*\n\n[Fonte: ${article.source} – DOI: ${article.doi || 'N/A'}]`;
  }

  getPlaceholderImage(topic: string): string {
    const encoded = encodeURIComponent(topic.substring(0, 50));
    return `https://placehold.co/1200x630/1976D2/FFFFFF?text=${encoded}`;
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
