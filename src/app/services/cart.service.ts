import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    try {
      const savedCart = localStorage.getItem('digikit_cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
        this.cartSubject.next(this.items);
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      this.items = [];
    }
  }

  addToCart(product: any, quantity: number = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ id: Date.now(), product, quantity });
    }
    this.saveCart();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity > 0) {
      this.items[index].quantity = quantity;
      this.saveCart();
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.saveCart();
  }

  getCartTotal() {
    return this.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('digikit_cart', JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }
}
