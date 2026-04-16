import { Component, inject, Input, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ArticleService } from '../../services/article.service';
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

  protected readonly article = signal<Article | null>(null);
  protected readonly articleMissing = signal(false);

  ngOnInit(): void {
    const found = this.articleService.getArticleById(this.id);
    if (found) {
      this.article.set(found);
      return;
    }
    this.articleMissing.set(true);
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
    return summary.split('\n').filter(p => p.trim().length > 0);
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
