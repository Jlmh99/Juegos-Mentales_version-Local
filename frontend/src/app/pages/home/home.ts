import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  
  protected readonly title = signal('frontend');
  mensajeBackend = signal('');

  // =======================
  // BUSCADOR ELASTICSEARCH
  // =======================
  elasticQuery = '';
  elasticResultados: any[] = [];

  // ==========================================
  // PRÁCTICA 7: MENÚ BASADO EN EVENTOS DE PUNTERO
  // ==========================================
  isGameMenuOpen = signal(false);

  // ==========================================
  // PRÁCTICA 8: EVENTO BASADO EN PERIODO (CALENDARIO)
  // ==========================================
  currentSeasonClass = signal('normal-season');
  announcementBanner = signal('');

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    // Inicializar la validación del calendario estacional
    this.checkCalendarEvent();

    this.auth.test().subscribe(res => {
      this.mensajeBackend.set(res);
    });

    this.auth.test().subscribe({
      next: res => this.mensajeBackend.set(res),
      error: err => console.error("Error detallado:", err)
    });
  }

  // Evalúa las fechas del sistema para cambiar la UI por periodo
  checkCalendarEvent() {
    const today = new Date();
    const month = today.getMonth(); // 5 = Junio, 6 = Julio (Temporada de Verano)

    // Si el mes actual es Junio o Julio, activamos el banner y tema estacional
    if (month === 10 || month === 11) {
      this.currentSeasonClass.set('summer-event-theme');
      this.announcementBanner.set('☀️ ¡Bienvenido al Evento de Verano en Mind Games! Potencia tu mente en estas vacaciones ☀️');
    } else {
      this.currentSeasonClass.set('normal-season');
      this.announcementBanner.set('');
    }
  }

  openGameMenu() { this.isGameMenuOpen.set(true); }
  closeGameMenu() { this.isGameMenuOpen.set(false); }

  searchText = signal('');
  juegos = signal([
    { nombre: 'Sudoku', descripcion: 'Juego lógico numérico que estimula la mente.', ruta: '#' },
    { nombre: 'Crucigrama', descripcion: 'Juego de palabras que mejora el vocabulario.', ruta: '#' }
  ]);

  juegosFiltrados = computed(() =>
    this.juegos().filter(juego =>
      juego.nombre.toLowerCase().includes(this.searchText().toLowerCase())
    )
  );

  esAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.rol === 'ADMIN';
    }
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  buscarElastic() {
    this.auth.search(this.elasticQuery)
      .subscribe({
        next: (data) => { this.elasticResultados = data; },
        error: (err) => { console.error('Error Elastic:', err); }
      });
  }
}
