import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  protected readonly title = signal('frontend');
  mensajeBackend = signal('');

  // =======================
  // BUSCADOR ELASTICSEARCH
  // =======================
  elasticQuery = '';
  elasticResultados: any[] = [];

  // ==========================================
  // PRÁCTICA 8: EVENTO BASADO EN PERIODO (CALENDARIO)
  // ==========================================
  currentSeasonClass = signal('season-spring');
  announcementBanner = signal('');

  // Temas por estación (fechas astronómicas aprox., hemisferio norte) + evento patrio
  private readonly temasCalendario: Record<string, { clase: string; banner: string }> = {
    invierno: {
      clase: 'season-winter',
      banner: '❄️ ¡Temporada de Invierno en Mind Games! Mantén tu mente activa en estos días fríos ❄️'
    },
    primavera: {
      clase: 'season-spring',
      banner: '🌸 ¡Llegó la Primavera a Mind Games! Renueva tu mente con nuevos retos 🌸'
    },
    verano: {
      clase: 'season-summer',
      banner: '☀️ ¡Bienvenido al Evento de Verano en Mind Games! Potencia tu mente en estas vacaciones ☀️'
    },
    otono: {
      clase: 'season-autumn',
      banner: '🍂 ¡Temporada de Otoño en Mind Games! Ejercita tu mente mientras caen las hojas 🍂'
    },
    independencia: {
      clase: 'season-independence',
      banner: '🇲🇽 ¡Viva México! Celebra las Fiestas Patrias jugando en Mind Games 🇲🇽'
    }
  };

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

  // Evalúa la fecha del sistema y aplica el tema correspondiente:
  // el evento de Independencia (1-16 sep) tiene prioridad sobre la estación del año.
  checkCalendarEvent() {
    const hoy = new Date();
    const clave = this.esMesPatrio(hoy) ? 'independencia' : this.obtenerEstacion(hoy);
    const tema = this.temasCalendario[clave];

    this.currentSeasonClass.set(tema.clase);
    this.announcementBanner.set(tema.banner);
  }

  // Fiestas Patrias: del 1 al 16 de septiembre
  private esMesPatrio(fecha: Date): boolean {
    return fecha.getMonth() === 8 && fecha.getDate() <= 16;
  }

  // Estaciones astronómicas del hemisferio norte
  private obtenerEstacion(fecha: Date): 'invierno' | 'primavera' | 'verano' | 'otono' {
    const mes = fecha.getMonth(); // 0 = enero ... 11 = diciembre
    const dia = fecha.getDate();
    const antesDe = (mesLimite: number, diaLimite: number) =>
      mes < mesLimite || (mes === mesLimite && dia < diaLimite);

    if (antesDe(2, 21)) return 'invierno';   // 1 ene - 20 mar
    if (antesDe(5, 21)) return 'primavera';  // 21 mar - 20 jun
    if (antesDe(8, 23)) return 'verano';     // 21 jun - 22 sep
    if (antesDe(11, 21)) return 'otono';     // 23 sep - 20 dic
    return 'invierno';                        // 21 dic - 31 dic
  }

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

  buscarElastic() {
    this.auth.search(this.elasticQuery)
      .subscribe({
        next: (data) => { this.elasticResultados = data; },
        error: (err) => { console.error('Error Elastic:', err); }
      });
  }
}
