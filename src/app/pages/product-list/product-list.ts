import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);

  products: any[] = [];
  categories: any[] = [];

  // Filter States
  searchQuery = '';
  selectedCategories: Set<number> = new Set();
  digitalOnly = false;
  physicalOnly = false;
  inStockOnly = false;
  sortBy = 'featured';
  viewMode: 'grid' | 'list' = 'grid';

  get filteredProducts() {
    let result = this.products;

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (this.selectedCategories.size > 0) {
      result = result.filter(p => p.category && this.selectedCategories.has(p.category.id));
    }

    if (this.digitalOnly && !this.physicalOnly) {
      result = result.filter(p => p.product_type === 'DIGITAL');
    } else if (this.physicalOnly && !this.digitalOnly) {
      result = result.filter(p => p.product_type === 'PHYSICAL');
    }

    if (this.sortBy === 'price_asc') {
      result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (this.sortBy === 'price_desc') {
      result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (this.sortBy === 'new') {
      result = [...result].sort((a, b) => b.id - a.id); // mock new by highest ID
    }

    return result;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error("Erreur API Django (produits):", err)
    });
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error("Erreur API Django (categories):", err)
    });
  }

  toggleCategory(categoryId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.add(categoryId);
    } else {
      this.selectedCategories.delete(categoryId);
    }
  }

  getCategoryCount(categoryId: number): number {
    return this.products.filter(p => p.category?.id === categoryId).length;
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
    alert('Produit ajouté au panier !');
  }
}
