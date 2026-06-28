import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authSysGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sesion = sessionStorage.getItem('usuarioSys');

  if (sesion) {
    return true;
  } else {
    router.navigate(['/login-sys']); 
    return false;
  }
};