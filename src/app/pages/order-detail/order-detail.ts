import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container order-detail-page" *ngIf="order">
      <div class="breadcrumb">
        <a routerLink="/">{{ 'PRODUCT_DETAIL.HOME' | translate }}</a> > <span>{{ 'ORDER.DETAIL_TITLE' | translate }} #{{order.id}}</span>
      </div>

      <div class="header-section glass-panel">
        <div class="status-info">
          <h1>{{ 'ORDER.STATUS' | translate }}: 
            <span class="status-badge" [ngClass]="order.status.toLowerCase()">{{order.status}}</span>
          </h1>
          <p>{{ 'ORDER.DATE' | translate }}: {{order.created_at | date:'short'}}</p>
        </div>
        <div class="total-info">
          <p>{{ 'ORDER.TOTAL' | translate }}</p>
          <p class="total-amount">{{order.total_amount}} FCFA</p>
        </div>
      </div>

      <div class="content-grid">
        <!-- Liste des articles -->
        <div class="items-section glass-panel">
          <h2>{{ 'ORDER.ITEMS' | translate }}</h2>
          <div class="items-list">
            <div class="order-item" *ngFor="let item of order.items">
              <img [src]="item.product.image" [alt]="item.product.title">
              <div class="item-details">
                <h3>{{item.product.title}}</h3>
                <p>{{item.quantity}} x {{item.product.price}} FCFA</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Téléchargements -->
        <div class="downloads-section glass-panel" *ngIf="order.download_links.length > 0">
          <h2>{{ 'ORDER.DOWNLOADS' | translate }}</h2>
          <div class="links-list">
            <div class="download-card" *ngFor="let link of order.download_links">
              <div class="link-info">
                <strong>{{link.product_title}}</strong>
                <p>{{ 'ORDER.REMAINING' | translate }}: {{link.max_downloads - link.downloads_count}}</p>
              </div>
              <a [href]="'http://localhost:8000/api/download/' + link.token + '/'" class="btn-primary mini-btn" target="_blank">
                <span class="material-symbols-outlined">download</span> {{ 'ORDER.DOWNLOAD_NOW' | translate }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container error-container glass-panel" *ngIf="error">
      <span class="material-symbols-outlined error-icon">error</span>
      <h1>{{ 'ORDER.ERROR_TITLE' | translate }}</h1>
      <p>{{error}}</p>
      <button class="btn-primary" routerLink="/">{{ 'CHECKOUT_SUCCESS.BACK_HOME' | translate }}</button>
    </div>
  `,
  styles: [`
    .order-detail-page { padding: 40px 20px; }
    .header-section { display: flex; justify-content: space-between; padding: 30px; margin-bottom: 30px; border-radius: 20px; align-items: center; }
    .status-badge { padding: 5px 15px; border-radius: 50px; font-size: 0.9rem; }
    .status-badge.success { background: rgba(76, 175, 80, 0.1); color: #4CAF50; border: 1px solid #4CAF50; }
    .status-badge.pending { background: rgba(255, 152, 0, 0.1); color: #FF9800; border: 1px solid #FF9800; }
    .total-amount { font-size: 2rem; font-weight: 800; color: var(--primary-color); }
    .content-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; }
    @media (max-width: 900px) { .content-grid { grid-template-columns: 1fr; } }
    .items-section, .downloads-section { padding: 30px; border-radius: 20px; }
    h2 { margin-bottom: 20px; font-size: 1.5rem; }
    .order-item { display: flex; gap: 20px; margin-bottom: 20px; align-items: center; padding-bottom: 15px; border-bottom: 1px solid var(--border-color); }
    .order-item img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; }
    .download-card { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; margin-bottom: 15px; }
    .mini-btn { padding: 8px 15px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
    .error-container { max-width: 600px; margin: 100px auto; padding: 60px; text-align: center; border-radius: 20px; }
    .error-icon { font-size: 60px; color: #f44336; margin-bottom: 20px; }
  `]
})
export class OrderDetail implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  
  order: any = null;
  error: string | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (id && sessionId) {
      this.http.get(`http://localhost:8000/api/orders/${id}/detail/?session_id=${sessionId}`)
        .subscribe({
          next: (data) => this.order = data,
          error: (err) => this.error = "Accès refusé ou commande introuvable."
        });
    } else {
      this.error = "Paramètres de session manquants.";
    }
  }
}
