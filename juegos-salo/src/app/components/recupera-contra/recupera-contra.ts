import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';


@Component({
  selector: 'app-recupera-contra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recupera-contra.html',
  styleUrl: './recupera-contra.css',
})
export class RecuperaContra {
  recuperarForm: FormGroup;


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  enviarInstrucciones() {
    if (this.recuperarForm.valid) {
      const email = this.recuperarForm.get('email')?.value;
      const usuarioEncontrado = this.usuarioService.buscarPorEmail(email);

      if(usuarioEncontrado) {
        alert('Se ha enviado un correo electrónico con instrucciones a ' + email);
        this.recuperarForm.reset();
      }else{
        alert('No se encontró ningún correo electrónico');
      }
    }
  }













}
