import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  cartService = inject(CartService);
  cartItemCount = 0;
  cartItems: CartItem[] = [];

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  removeItem(index: number, event: Event) {
    event.stopPropagation();
    this.cartService.removeItem(index);
  }
}
