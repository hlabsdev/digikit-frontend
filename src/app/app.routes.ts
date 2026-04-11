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
    {
        path: 'checkout/success',
        loadComponent: () => import('./pages/checkout-success/checkout-success').then(m => m.CheckoutSuccess)
    },
    {
        path: 'order/:id',
        loadComponent: () => import('./pages/order-detail/order-detail').then(m => m.OrderDetail)
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About)
    },
    { path: '**', redirectTo: '' }
];
