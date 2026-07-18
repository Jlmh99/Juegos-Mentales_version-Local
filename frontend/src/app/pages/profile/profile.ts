import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  successMessage = signal('');
  errorMessage = signal('');
  userRole = signal('');

  ngOnInit() {
    // 1. Cargar datos del usuario logueado
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole.set(userData.rol || 'USER');

    // CONTROL 1: Validación de formularios
    this.profileForm = this.fb.group({
      nombre: [userData.nombre || '', [Validators.required]],
      correo: [userData.correo || '', [Validators.required, Validators.email]]
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
  }

  guardarPerfil() {
    if (this.profileForm.valid) {
      const cached = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...cached, ...this.profileForm.value };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Registro de Auditoría Simulado
      this.registrarEnBitacora('Edición de perfil');
      this.successMessage.set('Perfil actualizado con éxito.');
      setTimeout(() => this.successMessage.set(''), 3000);
    }
  }

  cambiarPassword() {
    if (this.passwordForm.valid) {
      // Registro de Auditoría
      this.registrarEnBitacora('Cambio de contraseña');
      this.successMessage.set('Contraseña modificada bajo políticas seguras.');
      this.passwordForm.reset();
      setTimeout(() => this.successMessage.set(''), 3000);
    } else {
      this.errorMessage.set('La nueva contraseña debe tener mínimo 8 caracteres, incluyendo letras y números.');
      setTimeout(() => this.errorMessage.set(''), 4000);
    }
  }

  private registrarEnBitacora(accion: string) {
    const bitacora = JSON.parse(localStorage.getItem('bitacora') || '[]');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const ahora = new Date();
    
    bitacora.push({
      usuario: userData.correo || 'Anónimo',
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
