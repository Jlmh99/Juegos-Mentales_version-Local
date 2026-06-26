import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'alta' | 'media' | 'baja';
  completada: boolean;
  fecha: string;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css'
})
export class TaskManager {

  tareas = signal<Tarea[]>([
    { id: 1, titulo: 'Estudiar DOM manipulation', descripcion: 'Repasar selectores y eventos del DOM', prioridad: 'alta', completada: false, fecha: this.hoy() },
    { id: 2, titulo: 'Practicar Angular signals', descripcion: '', prioridad: 'media', completada: false, fecha: this.hoy() },
  ]);

  editandoId = signal<number | null>(null);
  errorMsg = signal('');
  filtroActivo = signal<string>('todas');

  filtros = [
    { label: '📋 Todas',      valor: 'todas' },
    { label: '⏳ Pendientes', valor: 'pendientes' },
    { label: '✅ Completadas',valor: 'completadas' },
    { label: '🔴 Alta',       valor: 'alta' },
    { label: '🟡 Media',      valor: 'media' },
    { label: '🟢 Baja',       valor: 'baja' },
  ];

  tareasFiltradas = computed(() => {
    const filtro = this.filtroActivo();
    return this.tareas().filter(t => {
      if (filtro === 'todas')      return true;
      if (filtro === 'pendientes') return !t.completada;
      if (filtro === 'completadas') return t.completada;
      return t.prioridad === filtro;
    });
  });

  tareasCompletadas = computed(() => this.tareas().filter(t => t.completada).length);

  // === CRUD ===
  guardarTarea() {
    const titulo    = (document.getElementById('input-titulo')    as HTMLInputElement).value.trim();
    const desc      = (document.getElementById('input-desc')      as HTMLTextAreaElement).value.trim();
    const prioridad = (document.getElementById('select-prioridad') as HTMLSelectElement).value as 'alta' | 'media' | 'baja';

    if (!titulo) {
      this.errorMsg.set('El título es obligatorio.');
      return;
    }
    this.errorMsg.set('');

    if (this.editandoId() !== null) {
      // Modificar tarea existente
      this.tareas.update(lista =>
        lista.map(t => t.id === this.editandoId()
          ? { ...t, titulo, descripcion: desc, prioridad }
          : t
        )
      );
      this.editandoId.set(null);
    } else {
      // Crear nueva tarea
      const nueva: Tarea = {
        id: Date.now(),
        titulo,
        descripcion: desc,
        prioridad,
        completada: false,
        fecha: this.hoy()
      };
      this.tareas.update(lista => [nueva, ...lista]);
    }

    this.limpiarFormulario();
  }

  iniciarEdicion(tarea: Tarea) {
    this.editandoId.set(tarea.id);
    (document.getElementById('input-titulo')     as HTMLInputElement).value    = tarea.titulo;
    (document.getElementById('input-desc')       as HTMLTextAreaElement).value = tarea.descripcion;
    (document.getElementById('select-prioridad') as HTMLSelectElement).value   = tarea.prioridad;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion() {
    this.editandoId.set(null);
    this.errorMsg.set('');
    this.limpiarFormulario();
  }

  eliminarTarea(id: number) {
    this.tareas.update(lista => lista.filter(t => t.id !== id));
    if (this.editandoId() === id) this.cancelarEdicion();
  }

  toggleCompletada(id: number) {
    this.tareas.update(lista =>
      lista.map(t => t.id === id ? { ...t, completada: !t.completada } : t)
    );
  }

  eliminarCompletadas() {
    this.tareas.update(lista => lista.filter(t => !t.completada));
  }

  contarPorFiltro(filtro: string): number {
    if (filtro === 'todas')       return this.tareas().length;
    if (filtro === 'pendientes')  return this.tareas().filter(t => !t.completada).length;
    if (filtro === 'completadas') return this.tareas().filter(t => t.completada).length;
    return this.tareas().filter(t => t.prioridad === filtro).length;
  }

  private limpiarFormulario() {
    (document.getElementById('input-titulo')     as HTMLInputElement).value    = '';
    (document.getElementById('input-desc')       as HTMLTextAreaElement).value = '';
    (document.getElementById('select-prioridad') as HTMLSelectElement).value   = 'media';
  }

  private hoy(): string {
    return new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
  }
}