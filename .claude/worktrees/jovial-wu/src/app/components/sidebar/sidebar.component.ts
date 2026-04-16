import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { MEDICAL_SOURCES, ArticleCategory, ArticleSource } from '../../models/article.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  protected readonly articleService = inject(ArticleService);
  protected readonly sources = MEDICAL_SOURCES;
  protected readonly searchInput = signal('');

  protected readonly categories: ArticleCategory[] = [
    'Oncologia', 'Cardiologia', 'Neurologia', 'Infectologia',
    'Genômica', 'Farmacologia', 'Saúde Mental', 'Pediatria',
    'Imunologia', 'Endocrinologia'
  ];

  protected readonly aiProcessedCount = computed(() =>
    this.articleService.articles().filter(a => a.aiProcessed).length
  );

  protected readonly observability = computed(() => this.articleService.observability());

  protected readonly providerRows = computed(() =>
    Object.entries(this.observability().providers)
      .map(([name, metrics]) => ({ name, ...metrics }))
      .sort((a, b) => b.failures - a.failures)
  );

  protected readonly observabilityHealth = computed(() => {
    const data = this.observability();
    if (data.totalSummaryRequests === 0) return 'Sem dados recentes';
    if (data.failedSummaries === 0) return 'Operação estável';
    return data.failedSummaries <= 3 ? 'Com degradação leve' : 'Com degradação crítica';
  });

  protected formatObsDate(value: string): string {
    if (!value) return 'N/A';
    return new Date(value).toLocaleString('pt-BR');
  }

  protected onSearch(value: string): void {
    this.searchInput.set(value);
    this.articleService.setSearch(value);
  }

  protected selectCategory(cat: ArticleCategory | null): void {
    this.articleService.setCategory(cat);
  }

  protected selectSource(src: ArticleSource | null): void {
    this.articleService.setSource(src);
  }

  protected clearFilters(): void {
    this.articleService.setSearch('');
    this.articleService.setCategory(null);
    this.articleService.setSource(null);
    this.searchInput.set('');
  }
}
