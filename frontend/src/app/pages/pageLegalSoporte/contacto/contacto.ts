import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  constructor(private location: Location) {}

  regresar() {
    this.location.back();
  }
}
