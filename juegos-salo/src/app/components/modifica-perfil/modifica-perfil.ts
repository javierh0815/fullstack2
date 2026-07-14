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
      const userActual = this.usuarioService.obtenerUsuarioActual();

      
      if (userActual && userActual.id) {


        const datosFinales = { 
          ...userActual, 
          ...this.perfilForm.value 
        };


        this.usuarioService.actualizar(userActual.id, datosFinales).subscribe({
          next: (usuarioActualizado) => {
            alert('Perfil modificado exitosamente');

  
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));

            this.router.navigate(['/cuenta-usuario']);
          },
          error: (err) => {
            console.error('Error al actualizar:', err);
            alert('Error al actualizar el perfil en el servidor');
          }
        });
      } else {
        alert('Error: No se pudo identificar al usuario actual.');
      }
    }
  }




}