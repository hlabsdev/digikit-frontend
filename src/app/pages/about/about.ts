import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="container about-page">
      <div class="glass-panel content-card">
        <h1>{{ 'ABOUT.TITLE' | translate }}</h1>
        <p class="description">{{ 'ABOUT.DESCRIPTION' | translate }}</p>
        
        <div class="mission-section">
          <h3>{{ 'ABOUT.MISSION_TITLE' | translate }}</h3>
          <p>{{ 'ABOUT.MISSION_TEXT' | translate }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-page { padding: 80px 20px; text-align: center; }
    .content-card { padding: 60px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 3rem; margin-bottom: 20px; color: var(--primary-color); }
    .description { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 40px; }
    .mission-section { text-align: left; border-top: 1px solid var(--border-color); padding-top: 40px; }
    h3 { margin-bottom: 15px; }
  `],
})
export class About { }
