import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';

// Rutas donde el navbar y el footer no deben mostrarse (páginas de acceso a la cuenta)
const RUTAS_SIN_CHROME = ['/login', '/register'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mostrarChrome = signal(true);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd))
      .subscribe((evento) => {
        const ruta = evento.urlAfterRedirects.split('?')[0];
        this.mostrarChrome.set(!RUTAS_SIN_CHROME.includes(ruta));
      });
  }
}
