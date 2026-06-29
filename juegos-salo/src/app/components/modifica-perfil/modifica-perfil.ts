import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifica-perfil.html'
})
export class ModificarPerfil implements OnInit {
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      username: [''], 
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit() {
    const user = this.usuarioService.obtenerUsuarioActual();
    if (user) {
      this.perfilForm.patchValue(user);
    }
  }

  modificar() {
    if (this.perfilForm.valid) {
      const user = this.usuarioService.obtenerUsuarioActual();
      if (user) {
        if (this.usuarioService.actualizar(user.username, this.perfilForm.value)) {
          alert('Perfil modificado exitosamente');
          this.router.navigate(['/cuenta-usuario']);
        } else {
          alert('Error al actualizar');
        }
      }
    }
  }
}