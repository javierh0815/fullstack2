import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';

export const authGuard: CanActivateFn = (_route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router)

  if(usuarioService.obtenerUsuarioActual()){
    return true;
  }else{
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }






















};
