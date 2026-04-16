import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatTooltipModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;

  protected formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  protected getSourceColor(source: string): string {
    const colors: Record<string, string> = {
      'PubMed': '#1976D2',
      'PMC': '#0288D1',
      'Embase': '#E65100',
      'Cochrane': '#00838F',
      'Scopus': '#6A1B9A',
      'NEJM': '#B71C1C',
      'Lancet': '#1B5E20',
      'JAMA': '#37474F',
      'BMJ': '#0D47A1',
    };
    return colors[source] || '#1976D2';
  }
}
