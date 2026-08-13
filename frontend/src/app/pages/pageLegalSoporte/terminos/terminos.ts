import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminos.html',
  styleUrl: './terminos.css'
})
export class Terminos {
  constructor(private location: Location) {}

  regresar() {
    this.location.back();
  }
}
