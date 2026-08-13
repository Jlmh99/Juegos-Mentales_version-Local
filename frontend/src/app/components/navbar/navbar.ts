import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  isGameMenuOpen = signal(false);

  openGameMenu() {
    this.isGameMenuOpen.set(true);
  }

  closeGameMenu() {
    this.isGameMenuOpen.set(false);
  }

  esAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.rol === 'ADMIN';
    }
    return false;
  }

  private registrarLogoutEnBitacora() {
    const usuarioActual = JSON.parse(localStorage.getItem('user') || '{}');
    const bitacora = JSON.parse(localStorage.getItem('bitacora') || '[]');
    const ahora = new Date();

    bitacora.unshift({
      usuario: usuarioActual.email || usuarioActual.correo || 'Usuario',
      fecha: ahora.toLocaleDateString(),
      hora: ahora.toLocaleTimeString(),
      ip: '192.168.1.64',
      accion: 'Cierre de sesión'
    });
    localStorage.setItem('bitacora', JSON.stringify(bitacora));
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.registrarLogoutEnBitacora();
      // Antes solo se quitaba 'user' y el token seguía vigente, así que el
      // authGuard te dejaba pasar igual. Limpiamos también token/rol, sin
      // tocar 'bitacora' para no perder el historial de auditoría.
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      this.router.navigate(['/login']);
    }
  }
}
