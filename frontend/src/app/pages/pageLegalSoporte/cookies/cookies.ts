import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookies.html',
  styleUrl: './cookies.css'
})
export class Cookies {
  constructor(private location: Location) {}

  regresar() {
    this.location.back();
  }
}
