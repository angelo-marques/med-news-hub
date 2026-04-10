import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Vexlyn News – Home'
  },
  {
    path: 'artigos',
    loadComponent: () => import('./pages/articles/articles.component').then(m => m.ArticlesComponent),
    title: 'Vexlyn News – Artigos'
  },
  {
    path: 'artigos/:id',
    loadComponent: () => import('./pages/article-detail/article-detail.component').then(m => m.ArticleDetailComponent),
    title: 'Vexlyn News – Artigo'
  },
  {
    path: 'fontes',
    loadComponent: () => import('./pages/sources/sources.component').then(m => m.SourcesComponent),
    title: 'Vexlyn News – Fontes'
  },
  { path: '**', redirectTo: '/home' }
];
