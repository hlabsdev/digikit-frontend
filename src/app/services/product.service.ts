import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { id: 1, title: 'Gaming Headset RGB', price: 79.99, image: 'https://via.placeholder.com/300?text=Gaming+Headset', type: 'Physical', isNew: false, isBestseller: true, discount: 0, category: 'Gaming' },
    { id: 2, title: 'Prototyping UI Kit', price: 49.00, image: 'https://via.placeholder.com/300?text=UI+Kit', type: 'Digital', isNew: true, isBestseller: true, discount: 0, category: 'Software' },
    { id: 3, title: 'Smart Watch X', price: 199.99, image: 'https://via.placeholder.com/300?text=Smart+Watch', type: 'Physical', isNew: false, isBestseller: false, discount: 20, category: 'Electronics' }
  ];

  getProducts() {
    return this.products;
  }
}
