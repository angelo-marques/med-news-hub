import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ArticleService } from './services/article.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div [class.dark]="themeService.isDark()" class="min-h-screen" style="background: var(--bg-primary); color: var(--text-primary); transition: all 0.3s ease;">
      <app-header />
      <main class="pt-16">
        <router-outlet />
      </main>
      <footer class="py-8 text-center text-sm" style="background: var(--header-bg); border-top: 1px solid var(--border-color); color: var(--text-secondary); margin-top: 2rem;">
        <p>&copy; 2026 Vexlyn News – Portal de Pesquisas Médicas. Conteúdo gerado com IA para fins informativos.</p>
        <p class="mt-1">Fontes: PubMed · PMC · NEJM · The Lancet · JAMA · BMJ · Cochrane · Scopus · Embase</p>
        <div class="mt-4 max-w-4xl mx-auto px-4 text-left sm:text-center">
          <p style="line-height: 1.6;">
            <strong>Implementação e Arquitetura:</strong> Angelo Marques de Oliveira Silva ·
            <a href="https://www.linkedin.com/in/angelomarquesdeoliveirasilva" target="_blank" rel="noopener noreferrer" style="color: var(--link-color);">
              LinkedIn
            </a>
          </p>
          <p class="mt-2" style="line-height: 1.6;">
            <strong>Ferramentas e stack de mercado:</strong> Angular 21, TypeScript, Angular Material, Tailwind CSS, Node.js, GitHub Actions (CI/CD), PubMed API e pipeline multi-IA com fallback (Gemini, Groq, OpenRouter, SiliconFlow, OpenAI), com retry automático, logs de falha e processamento em lote.
          </p>
          <p class="mt-2" style="line-height: 1.6;">
            <strong>Valor para desenvolvedores:</strong> projeto com ingestão de dados científicos, geração editorial com IA, observabilidade de APIs e entrega contínua em produção, demonstrando competências reais de engenharia full stack, qualidade e escalabilidade.
          </p>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  protected readonly themeService = inject(ThemeService);
  private readonly articleService = inject(ArticleService);

  ngOnInit(): void {
    this.articleService.loadArticles();
  }
}
