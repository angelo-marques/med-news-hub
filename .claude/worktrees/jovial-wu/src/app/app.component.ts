import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ArticleService } from './services/article.service';
import { ThemeService } from './services/theme.service';
import { environment } from '../environments/environment';

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
        <p class="mt-1"><strong>Implementação:</strong> {{developerName}} · Pipeline de dados médicos, fallback multi-IA, logs de observabilidade e publicação contínua.</p>
        <p class="mt-1">Fontes: PubMed · PMC · NEJM · The Lancet · JAMA · BMJ · Cochrane · Scopus · Embase</p>
        <p class="mt-4 max-w-3xl mx-auto px-4" style="line-height: 1.6;">
          <strong>Valor para o mercado dev:</strong> este sistema combina ingestão automatizada de dados científicos, processamento resiliente com múltiplas APIs de IA, controle de qualidade de conteúdo e deploy contínuo no GitHub Pages, demonstrando competências de arquitetura full stack, confiabilidade e product thinking.
        </p>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  protected readonly themeService = inject(ThemeService);
  private readonly articleService = inject(ArticleService);
  protected readonly developerName = environment.developerName;

  ngOnInit(): void {
    this.articleService.loadArticles();
  }
}
