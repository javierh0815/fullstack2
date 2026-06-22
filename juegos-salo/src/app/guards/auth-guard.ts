import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router)

  if(usuarioService.obtenerUsuarioActual()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }






















};
