import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { UsuarioSysService } from '../services/usuario-sys-service';

export const authSysGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sysService = inject(UsuarioSysService);

  if (sysService.obtenerUsuariosSistema()) {
    return true;
  } else {
    router.navigate(['/login-sys']); 
    return false;
  }
};