import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);
  
  product: any;
  quantity: number = 1;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProductById(id).subscribe({
        next: (data) => this.product = data,
        error: (err) => console.error("Erreur API Django (détail):", err)
      });
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      alert('Produit ajouté au panier !');
    }
  }
}
