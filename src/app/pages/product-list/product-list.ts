import { Component, OnInit, inject, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  // State Signals
  products = signal<any[]>([]);
  categories = signal<Category[]>([]);
  searchQuery = signal('');
  selectedCategories = signal<Set<number>>(new Set());
  digitalOnly = signal(false);
  physicalOnly = signal(false);
  licenseOnly = signal(false);
  inStockOnly = signal(false);
  sortBy = signal('featured');
  viewMode = signal<'grid' | 'list'>('grid');

  // Computed: Category Counts (optimized)
  categoryCounts = computed(() => {
    const counts: Record<number, number> = {};
    const allProducts = this.products();
    allProducts.forEach(p => {
      if (p.category?.id) {
        counts[p.category.id] = (counts[p.category.id] || 0) + 1;
      }
    });
    return counts;
  });

  // Computed: Filtered Products
  filteredProducts = computed(() => {
    let result = this.products();
    const query = this.searchQuery().toLowerCase();
    const selectedCats = this.selectedCategories();
    const digital = this.digitalOnly();
    const physical = this.physicalOnly();
    const license = this.licenseOnly();
    const sort = this.sortBy();

    if (query) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    if (selectedCats.size > 0) {
      result = result.filter(p => p.category && selectedCats.has(p.category.id));
    }

    // Type Filter Logic
    if (digital && !physical && !license) {
      result = result.filter(p => p.product_type === 'DIGITAL');
    } else if (physical && !digital && !license) {
      result = result.filter(p => p.product_type === 'PHYSICAL');
    } else if (license && !digital && !physical) {
      result = result.filter(p => p.product_type === 'LICENSE');
    }

    // Sort Logic
    if (sort === 'price_asc') {
      result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'price_desc') {
      result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sort === 'new') {
      result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
  });

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erreur API Django (produits):", err)
    });
    
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erreur API Django (categories):", err)
    });
  }

  toggleCategory(categoryId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedCategories.update(prev => {
      const next = new Set(prev);
      if (isChecked) next.add(categoryId);
      else next.delete(categoryId);
      return next;
    });
  }

  resetFilters() {
    this.searchQuery.set('');
    this.digitalOnly.set(false);
    this.physicalOnly.set(false);
    this.licenseOnly.set(false);
    this.selectedCategories.set(new Set());
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
  }

  buyDirect(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
    this.router.navigate(['/checkout']);
  }
}
