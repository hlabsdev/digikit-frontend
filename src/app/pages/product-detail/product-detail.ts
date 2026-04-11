import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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
  router = inject(Router);
  productService = inject(ProductService);
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef);

  product: any;
  quantity: number = 1;
  mainImage: string | null = null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.cdr.detectChanges();
        },
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

  buyDirect() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.router.navigate(['/checkout']);
    }
  }

  setMainImage(imageUrl: string) {
    this.mainImage = imageUrl;
  }
}
