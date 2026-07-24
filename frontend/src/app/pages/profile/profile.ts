import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  successMessage = signal('');
  errorMessage = signal('');
  userRole = signal('');
  cargando = signal(true);

  ngOnInit() {
    // CONTROL 1: Validación de formularios
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    // CONTROL 1 y 2: Formulario con Políticas de contraseña segura (Mínimo 8 caracteres, 1 letra y 1 número)
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]]
    });

    // 1. Cargamos los datos reales del usuario logueado desde el backend
    this.auth.getMe().subscribe({
      next: (user) => {
        this.userRole.set(user.rol || 'USER');
        this.profileForm.patchValue({
          username: user.username,
          email: user.email
        });
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar el perfil:', err);
        this.mostrarError('No se pudo cargar el perfil.');
        this.cargando.set(false);
      }
    });
  }

  guardarPerfil() {
    if (this.profileForm.invalid) return;

    this.auth.updateMe(this.profileForm.value).subscribe({
      next: (res: any) => {
        // El backend puede regenerar el token si el correo cambió
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        const usuario = res.usuario || res;
        localStorage.setItem('user', JSON.stringify(usuario));
        localStorage.setItem('rol', usuario.rol);

        this.registrarEnBitacora('Edición de perfil');
        this.mostrarExito('Perfil actualizado con éxito.');
      },
      error: (err: HttpErrorResponse) => {
        this.mostrarError(typeof err.error === 'string' ? err.error : 'No se pudo actualizar el perfil.');
      }
    });
  }

  cambiarPassword() {
    if (this.passwordForm.invalid) {
      this.mostrarError('La nueva contraseña debe tener mínimo 8 caracteres, incluyendo letras y números.');
      return;
    }

    this.auth.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        this.registrarEnBitacora('Cambio de contraseña');
        this.mostrarExito('Contraseña modificada bajo políticas seguras.');
        this.passwordForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.mostrarError(typeof err.error === 'string' ? err.error : 'No se pudo cambiar la contraseña.');
      }
    });
  }

  private mostrarExito(msg: string) {
    this.successMessage.set(msg);
    setTimeout(() => this.successMessage.set(''), 3000);
  }

  private mostrarError(msg: string) {
    this.errorMessage.set(msg);
    setTimeout(() => this.errorMessage.set(''), 4000);
  }

  private registrarEnBitacora(accion: string) {
    const bitacora = JSON.parse(localStorage.getItem('bitacora') || '[]');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const ahora = new Date();

    bitacora.push({
      usuario: userData.email || 'Anónimo',
      fecha: ahora.toLocaleDateString(),
      hora: ahora.toLocaleTimeString(),
      ip: '192.168.1.85', // IP Simulada
      accion: accion
    });
    localStorage.setItem('bitacora', JSON.stringify(bitacora));
  }

  regresar() {
    this.router.navigate(['/home']);
  }
}
