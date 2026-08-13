import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacidad.html',
  styleUrl: './privacidad.css'
})
export class Privacidad {
  constructor(private location: Location) {}

  regresar() {
    this.location.back();
  }
}
