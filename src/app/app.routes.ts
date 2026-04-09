import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home) // Removed .component
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/product-list/product-list').then(m => m.ProductList)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail)
    },
    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout)
    },
    { path: '**', redirectTo: '' }
];
