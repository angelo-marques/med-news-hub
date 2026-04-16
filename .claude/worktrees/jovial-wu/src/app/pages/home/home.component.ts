import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroSliderComponent } from '../../components/hero-slider/hero-slider.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HeroSliderComponent,
    ArticleCardComponent,
    SidebarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected readonly articleService = inject(ArticleService);

  protected readonly latestArticles = computed(() =>
    this.articleService.filteredArticles().slice(0, 9)
  );
}
