import { Routes } from '@angular/router';

export const routes: Routes = [


    {
        path: '',
        loadComponent: () => import('./components/home/home').then(m => m.Home)
    },

    {
        path: 'categoria/:id',
        loadComponent: () => import('./components/categoria/categoria').then(m => m.Categoria)
    },

    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },

    {
        path: 'carrito',
        loadComponent: () => import('./components/carrito/carrito').then(m => m.Carrito)
    }







];
