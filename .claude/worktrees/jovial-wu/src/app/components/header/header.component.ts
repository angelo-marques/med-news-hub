import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { ThemeService } from '../../services/theme.service';
import { ArticleService } from '../../services/article.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly articleService = inject(ArticleService);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly searchVisible = signal(false);

  protected readonly navItems = [
    { label: 'Home', route: '/home', icon: 'home' },
    { label: 'Artigos', route: '/artigos', icon: 'article' },
    { label: 'Fontes', route: '/fontes', icon: 'source' },
  ];

  toggleMobileMenu(): void { this.mobileMenuOpen.update(v => !v); }
  toggleSearch(): void { this.searchVisible.update(v => !v); }

  onSearch(query: string): void {
    this.articleService.setSearch(query);
  }
}
