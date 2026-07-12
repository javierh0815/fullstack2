import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioSysService } from '../../services/usuario-sys-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-sys',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-sys.html',
  styleUrl: './login-sys.css',
})
export class LoginSys {
  private fb = inject(FormBuilder);
  private sysService = inject(UsuarioSysService);
  private router = inject(Router);

  loginSysForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginSysForm.valid) {
      const { username, password } = this.loginSysForm.value;


      this.sysService.iniciarSesion(username, password).subscribe({
        next: (exito) => {
          if (exito) {
            alert('Inicio de sesión exitoso...');
            this.router.navigate(['/consola-sys']);
          } else {
            alert('Credenciales incorrectas. Intentar de nuevo...');
            this.loginSysForm.reset();
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Hubo un error de conexión con el servidor.');
        }
      });
    }
  }






}