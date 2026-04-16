import { Component, inject, Input, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ArticleService } from '../../services/article.service';
import { AiService } from '../../services/ai.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailComponent implements OnInit {
  @Input({ required: true }) id!: string;

  private readonly articleService = inject(ArticleService);
  private readonly aiService = inject(AiService);

  protected readonly article = signal<Article | null>(null);
  protected readonly generatingSummary = signal(false);

  ngOnInit(): void {
    const found = this.articleService.getArticleById(this.id);
    if (found) {
      this.article.set(found);
      if (!found.journalisticSummary && !found.aiProcessed) {
        this.generateSummary(found);
      }
    }
  }

  private generateSummary(article: Article): void {
    this.generatingSummary.set(true);
    this.aiService.generateJournalisticSummary(article).subscribe({
      next: (summary) => {
        this.article.update(a => a ? { ...a, journalisticSummary: summary, aiProcessed: true, aiProvider: 'Runtime fallback' } : a);
        this.generatingSummary.set(false);
      },
      error: () => this.generatingSummary.set(false)
    });
  }

  protected formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  protected formatSummary(summary: string): string[] {
    return summary
      .split('\n')
      .map(p => this.removeSectionLabel(p).trim())
      .filter(p => p.length > 0);
  }

  private removeSectionLabel(value: string): string {
    return value.replace(/^(t[ií]tulo|title|lead|contexto cient[ií]fico|scientific context|resultados principais|key results|impacto cl[ií]nico|clinical impact|limita[cç][oõ]es do estudo|study limitations|pr[oó]ximos passos|next steps)\s*:\s*/i, '');
  }

  protected getSourceColor(source: string): string {
    const colors: Record<string, string> = {
      'PubMed': '#1976D2', 'PMC': '#0288D1', 'Embase': '#E65100',
      'Cochrane': '#00838F', 'Scopus': '#6A1B9A', 'NEJM': '#B71C1C',
      'Lancet': '#1B5E20', 'JAMA': '#37474F', 'BMJ': '#0D47A1',
    };
    return colors[source] || '#1976D2';
  }
}
