import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  products: any[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error("Erreur API Django (produits):", err)
    });
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
    alert('Produit ajouté au panier !');
  }
}
