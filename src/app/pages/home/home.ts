import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  translate = inject(TranslateService);

  featuredProducts: any[] = [];
  latestProducts: any[] = [];
  topSellingProducts: any[] = [];

  ngOnInit() {
    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data;
        this.cdr.detectChanges();
      }
    });

    this.productService.getLatestProducts().subscribe({
      next: (data) => {
        this.latestProducts = data;
        this.cdr.detectChanges();
      }
    });

    this.productService.getTopSellingProducts().subscribe({
      next: (data) => {
        this.topSellingProducts = data;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
    alert(this.translate.instant('COMMON.ADDED_TO_CART'));
  }

  buyDirect(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
    this.router.navigate(['/checkout']);
  }
}
