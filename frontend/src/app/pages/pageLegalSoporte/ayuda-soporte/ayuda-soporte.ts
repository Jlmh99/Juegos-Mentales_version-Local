import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-ayuda-soporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ayuda-soporte.html',
  styleUrl: './ayuda-soporte.css'
})
export class AyudaSoporte {
  soporteForm: FormGroup;
  enviando = signal(false);
  exito = signal(false);
  error = signal('');

  constructor(private fb: FormBuilder, private auth: AuthService, private location: Location) {
    this.soporteForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  regresar() {
    this.location.back();
  }

  enviar() {
    if (this.soporteForm.invalid) return;

    this.enviando.set(true);
    this.error.set('');

    this.auth.enviarSoporte(this.soporteForm.value).subscribe({
      next: () => {
        this.enviando.set(false);
        this.exito.set(true);
        this.soporteForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.enviando.set(false);
        this.error.set(typeof err.error === 'string' ? err.error : 'No se pudo enviar tu solicitud. Intenta más tarde.');
      }
    });
  }
}
