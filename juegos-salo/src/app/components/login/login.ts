import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(){
    if(this.loginForm.valid){
      const { username, password } = this.loginForm.value;
      const usuarioEncontrado = this.usuarioService.validarCredenciales(username,password);

      if (usuarioEncontrado){
        this.usuarioService.iniciarSesion(usuarioEncontrado);
        alert(`¡Bienvenido, ${usuarioEncontrado.nombre}!`);
        this.router.navigate(['/']);
      }else{
        alert('Nombre de usuario o contraseña incorrectos');
      }
    }
  }




























}
