import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8000/api';

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}/`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/`);
  }

  getFeaturedProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/featured/`);
  }

  getLatestProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/latest/`);
  }

  getTopSellingProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/top_selling/`);
  }
}
