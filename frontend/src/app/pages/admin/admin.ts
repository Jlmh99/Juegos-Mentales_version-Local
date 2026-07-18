import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  mostrarModal = false;
  usuarioAEliminar: any = null;

  usuarioEditando: any = null;
  mostrarModalEditar = false;

  usuarios = signal<any[]>([]);
  usuarioActual = JSON.parse(localStorage.getItem('user') || '{}');

  // PARTE 3: Bitácora de Auditoría Reactiva
  bitacora = signal<any[]>([]);

  nuevoUsuario = {
    username: '',
    email: '',
    password: '',
    rol: 'USER'
  };

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarBitacora();
  }

  cargarUsuarios() {
    this.auth.getUsers().subscribe(data => {
      this.usuarios.set(data);
    });
  }

  // Carga el historial persistido en caché o inicializa semillas si está vacío
  cargarBitacora() {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('bitacora')) {
        const datosSemilla = [
          { usuario: 'juan@uteq.edu.mx', fecha: '17/07/2026', hora: '10:14:22', ip: '192.168.1.64', accion: 'Inicio de sesión' },
          { usuario: 'admin@mindgames.com', fecha: '17/07/2026', hora: '11:02:05', ip: '192.168.1.100', accion: 'Alta de usuarios' },
          { usuario: 'luis@gaming.com', fecha: '17/07/2026', hora: '14:30:00', ip: '187.210.45.12', accion: 'Cambio de contraseña' }
        ];
        localStorage.setItem('bitacora', JSON.stringify(datosSemilla));
      }
      this.bitacora.set(JSON.parse(localStorage.getItem('bitacora') || '[]'));
    }
  }

  // Registra un evento de seguridad dinámicamente en el historial
  registrarEventoAuditoria(accion: string, afectado: string) {
    if (isPlatformBrowser(this.platformId)) {
      const ahora = new Date();
      const nuevoLog = {
        usuario: this.usuarioActual.email || this.usuarioActual.username || 'ADMIN',
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString(),
        ip: '192.168.1.64', // IP de auditoría local simulada
        accion: `${accion} -> [${afectado}]`
      };

      const bitacoraActual = [nuevoLog, ...this.bitacora()];
      localStorage.setItem('bitacora', JSON.stringify(bitacoraActual));
      this.bitacora.set(bitacoraActual);
    }
  }

  eliminar(id: number) {
    const correoAfectado = this.usuarioAEliminar?.email || `ID: ${id}`;
    this.auth.deleteUser(id).subscribe({
      next: () => {
        this.usuarios.set(this.usuarios().filter(u => u.id !== id));
        this.registrarEventoAuditoria('Eliminación de usuario', correoAfectado);
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }

  crear() {
    const correoCreado = this.nuevoUsuario.email;
    this.auth.createUser(this.nuevoUsuario).subscribe(() => {
      this.cargarUsuarios();
      this.registrarEventoAuditoria('Alta de usuarios', correoCreado);
      this.nuevoUsuario = { username: '', email: '', password: '', rol: 'USER' };
    });
  }

  abrirModalEditar(user: any) {
    this.usuarioEditando = { ...user }; // copia
    this.mostrarModalEditar = true;
  }

  guardarCambios() {
    const userEnviar = { ...this.usuarioEditando };
    const originalUser = this.usuarios().find(u => u.id === userEnviar.id);

    if (!userEnviar.password || userEnviar.password.trim() === '') {
      delete userEnviar.password;
    }

    this.auth.updateUser(userEnviar.id, userEnviar)
      .subscribe({
        next: () => {
          this.cargarUsuarios();
          
          // Auditar si cambió el Rol o datos comunes
          if (originalUser && originalUser.rol !== userEnviar.rol) {
            this.registrarEventoAuditoria(`Cambios de roles (${originalUser.rol} a ${userEnviar.rol})`, userEnviar.email);
          } else if (userEnviar.password) {
            this.registrarEventoAuditoria('Cambio de contraseña (por Admin)', userEnviar.email);
          } else {
            this.registrarEventoAuditoria('Edición de usuario', userEnviar.email);
          }

          this.cerrarModalEditar();
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
        }
      });
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.usuarioEditando = null;
  }

  abrirModalEliminar(user: any) {
    this.usuarioAEliminar = user;
    this.mostrarModal = true;
  }

  confirmarEliminar() {
    if (this.usuarioAEliminar) {
      this.eliminar(this.usuarioAEliminar.id);
    }
    this.cerrarModal();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioAEliminar = null;
  }

  esUsuarioActual(user: any): boolean {
    return user && this.usuarioActual && user.id === this.usuarioActual.id;
  }

  esAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.rol === 'ADMIN';
    }
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.registrarEventoAuditoria('Cierre de sesión', this.usuarioActual.email || 'ADMIN');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
}