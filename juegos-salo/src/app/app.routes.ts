import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [


    {
        path: '',
        loadComponent: () => import('./components/home/home').then(m => m.Home)
    },

    {
        path: 'registro',
        loadComponent: () => import('./components/registro/registro').then(m => m.Registro)
    },

    {
        path: 'categoria/:id',
        loadComponent: () => import('./components/categoria/categoria').then(m => m.Categoria),
        runGuardsAndResolvers: 'paramsOrQueryParamsChange' 
    },

    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },

    {
        path: 'carrito',
        loadComponent: () => import('./components/carrito/carrito').then(m => m.Carrito),
        canActivate: [authGuard]
    },

    {
        path: 'cuenta-usuario',
        loadComponent: () => import('./components/cuenta-usuario/cuenta-usuario').then(m => m.CuentaUsuario),
        canActivate: [authGuard]
    }







];
