import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const usuarioEncontrado = this.usuarioService.validarCredenciales(username, password);

      if (usuarioEncontrado) {
        this.usuarioService.iniciarSesion(usuarioEncontrado);


        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        alert(`¡Bienvenido, ${usuarioEncontrado.nombre}!`);
        this.router.navigateByUrl(returnUrl);
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    }
  }
}