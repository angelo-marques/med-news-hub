import { Component, inject, signal, computed, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  private readonly articleService = inject(ArticleService);

  protected readonly currentIndex = signal(0);
  protected readonly isTransitioning = signal(false);
  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;

  protected readonly slides = computed(() => this.articleService.highlightedArticles());
  protected readonly currentSlide = computed(() => this.slides()[this.currentIndex()] ?? null);

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  protected goTo(index: number): void {
    if (index === this.currentIndex() || this.isTransitioning()) return;
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.currentIndex.set(index);
      this.isTransitioning.set(false);
    }, 300);
  }

  protected next(): void {
    const slides = this.slides();
    if (slides.length === 0) return;
    const next = (this.currentIndex() + 1) % slides.length;
    this.goTo(next);
    this.restartAutoPlay();
  }

  protected prev(): void {
    const slides = this.slides();
    if (slides.length === 0) return;
    const prev = (this.currentIndex() - 1 + slides.length) % slides.length;
    this.goTo(prev);
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => this.next(), 6000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  protected formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }
}
