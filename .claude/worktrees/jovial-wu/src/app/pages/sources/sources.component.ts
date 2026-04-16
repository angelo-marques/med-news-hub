import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MEDICAL_SOURCES } from '../../models/article.model';

@Component({
  selector: 'app-sources',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './sources.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesComponent {
  protected readonly sources = MEDICAL_SOURCES;
}
