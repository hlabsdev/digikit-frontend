import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container success-container glass-panel">
      <div class="success-icon">
        <span class="material-symbols-outlined">check_circle</span>
      </div>
      <h1>{{ 'CHECKOUT_SUCCESS.TITLE' | translate }}</h1>
      <p class="order-id">{{ 'CHECKOUT_SUCCESS.ORDER_NO' | translate }} #{{orderId}}</p>
      
      <div class="message-box">
        <p>{{ 'CHECKOUT_SUCCESS.MESSAGE_BODY' | translate }}</p>
      </div>

      <div class="actions">
        <button class="btn-primary" routerLink="/">
          {{ 'CHECKOUT_SUCCESS.BACK_HOME' | translate }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .success-container {
      max-width: 600px;
      margin: 100px auto;
      padding: 60px;
      text-align: center;
      border-radius: 30px;
    }
    .success-icon {
      color: #4CAF50;
      margin-bottom: 20px;
    }
    .success-icon span { font-size: 80px; }
    h1 { margin-bottom: 10px; }
    .order-id { font-weight: bold; color: var(--text-muted); margin-bottom: 30px; }
    .message-box { background: rgba(139, 61, 255, 0.05); padding: 25px; border-radius: 15px; margin-bottom: 40px; }
    .actions { display: flex; justify-content: center; }
  `]
})
export class CheckoutSuccess implements OnInit {
  route = inject(ActivatedRoute);
  orderId: string | null = null;

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParamMap.get('order');
  }
}
