import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  cartService = inject(CartService);
  translate = inject(TranslateService);

  cartItems: CartItem[] = [];
  customerName = '';
  customerEmail = '';
  customerPhone = '';

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get totalAmount() {
    return this.cartService.getCartTotal();
  }

  updateQuantity(index: number, change: number) {
    const newQty = this.cartItems[index].quantity + change;
    if (newQty > 0) {
      this.cartService.updateQuantity(index, newQty);
    }
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  processCheckout() {
    if (!this.customerName || !this.customerEmail || !this.customerPhone) {
      alert(this.translate.instant('CHECKOUT.ERROR_REQUIRED'));
      return;
    }

    // Simulate API POST request to Django
    fetch('http://localhost:8000/api/orders/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: this.customerName,
        customer_email: this.customerEmail,
        customer_phone: this.customerPhone,
        total_amount: this.totalAmount,
        items: this.cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity
        }))
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.payment_url) {
          this.cartService.clearCart(); // Empty cart since order created
          window.location.href = data.payment_url;
        } else {
          alert(this.translate.instant('CHECKOUT.ERROR_INIT'));
        }
      })
      .catch(err => {
        console.error(err);
        alert(this.translate.instant('CHECKOUT.ERROR_BACKEND'));
      });
  }
}
