import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { authSysGuard } from './guards/auth-sys-guard';

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
        path: 'recupera-contra',
        loadComponent: () => import('./components/recupera-contra/recupera-contra').then(m => m.RecuperaContra)
    },
    
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: 'cuenta-usuario', loadComponent: () => import('./components/cuenta-usuario/cuenta-usuario').then(m => m.CuentaUsuario) },
            { path: 'modifica-perfil', loadComponent: () => import('./components/modifica-perfil/modifica-perfil').then(m => m.ModificarPerfil) },
            { path: 'carrito', loadComponent: () => import('./components/carrito/carrito').then(m => m.CarritoComponent) }
        ]
    },

    { 
        path: 'login-sys', 
        loadComponent: () => import('./components/login-sys/login-sys').then(m => m.LoginSys) 
    },

    { 
        path: 'consola-sys', 
        loadComponent: () => import('./components/consola-sys/consola-sys').then(m => m.ConsolaSys),
        canActivate: [authSysGuard]
    }







];
