import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required,
                       Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.=#\-]{6,18}$/),
      ]],
      confirmPassword: ['', Validators.required],
      fechaNacimiento: ['', this.validarEdad],
      direccion: ['', Validators.required],
    }, { validators: this.passwordsIguales.bind(this) });
  }

  validarEdad(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (hoy < new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate())) edad--;
    return edad <13 ? {menorEdad: true} : null;


  }

  passwordsIguales(group: AbstractControl): ValidationErrors | null {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;


      if (!confirmPassword) return null; 

      return password === confirmPassword ? null : { passwordsNoCoinciden: true };
  }


  registrar(){
    if (this.registroForm.valid) {
      const { confirmPassword, ...datosUsuario } = this.registroForm.value;

      if (this.usuarioService.existe(datosUsuario.username)) {
        alert('El nombre de usuario ya existe, por favor elegir otro.')
        return;
      }

      this.usuarioService.guardar(datosUsuario);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.registroForm.reset();
    }
  }

















}
