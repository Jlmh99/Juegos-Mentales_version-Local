import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dom-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dom-demo.html',
  styleUrl: './dom-demo.css'
})
export class DomDemo {

  // === Estado reactivo ===
  elementos = signal<string[]>([]);
  logs = signal<string[]>([]);
  grande = false;
  conBorde = false;

  // === Sección 1: Modificar contenido ===
  cambiarTexto() {
    const input = document.getElementById('nuevo-texto') as HTMLInputElement;
    const parrafo = document.getElementById('texto-demo') as HTMLParagraphElement;
    if (input.value.trim()) {
      parrafo.textContent = input.value;
      input.value = '';
    }
  }

  restaurarTexto() {
    const parrafo = document.getElementById('texto-demo') as HTMLParagraphElement;
    parrafo.textContent = 'Este es el texto original del párrafo.';
  }

  // === Sección 2: Modificar estilos ===
  cambiarColor(color: string) {
    const caja = document.getElementById('caja-estilos') as HTMLDivElement;
    const colores: Record<string, string> = {
      rojo:   '#e74c3c',
      azul:   '#3498db',
      verde:  '#2ecc71',
      morado: '#9b59b6'
    };
    caja.style.backgroundColor = colores[color];
    caja.style.color = '#fff';
  }

  toggleTamano() {
    const caja = document.getElementById('caja-estilos') as HTMLDivElement;
    this.grande = !this.grande;
    caja.style.fontSize = this.grande ? '1.8rem' : '1rem';
    caja.style.padding  = this.grande ? '2rem' : '1rem';
  }

  toggleBorde() {
    const caja = document.getElementById('caja-estilos') as HTMLDivElement;
    this.conBorde = !this.conBorde;
    caja.style.border = this.conBorde ? '4px dashed #f39c12' : 'none';
    caja.style.borderRadius = this.conBorde ? '0px' : '12px';
  }

  // === Sección 3: Crear y eliminar elementos ===
  agregarElemento() {
    const input = document.getElementById('texto-nuevo-elem') as HTMLInputElement;
    const texto = input.value.trim();
    if (texto) {
      this.elementos.update(lista => [...lista, texto]);
      input.value = '';
    }
  }

  eliminarElemento(index: number) {
    this.elementos.update(lista => lista.filter((_, i) => i !== index));
  }

  eliminarUltimo() {
    this.elementos.update(lista => lista.slice(0, -1));
  }

  limpiarLista() {
    this.elementos.set([]);
  }

  // === Sección 4: Eventos ===
  registrarEvento(tipo: string) {
    const hora = new Date().toLocaleTimeString();
    this.logs.update(l => [`[${hora}] Evento: ${tipo}`, ...l.slice(0, 9)]);
  }

  limpiarLogs() {
    this.logs.set([]);
  }
}
