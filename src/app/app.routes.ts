import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: 'products', pathMatch: 'full'
    },
    {
        path: "products",
        loadComponent: () => import('./components/products/products.component').then((item) => item.ProductsComponent),
    },
    {
        path: "cart",
        loadComponent: () => import('./components/cart/cart.component').then((item) => item.CartComponent),
    }
];
