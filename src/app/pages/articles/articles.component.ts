import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    ArticleCardComponent,
    SidebarComponent
  ],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {
  protected readonly articleService = inject(ArticleService);
}
