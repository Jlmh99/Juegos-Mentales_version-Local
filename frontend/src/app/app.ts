import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Footer } from './components/footer/footer';

// Rutas donde el footer no debe mostrarse (páginas de acceso a la cuenta)
const RUTAS_SIN_FOOTER = ['/login', '/register'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mostrarFooter = signal(true);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd))
      .subscribe((evento) => {
        const ruta = evento.urlAfterRedirects.split('?')[0];
        this.mostrarFooter.set(!RUTAS_SIN_FOOTER.includes(ruta));
      });
  }
}
