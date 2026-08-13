import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';

interface FaqItem {
  pregunta: string;
  respuesta: string;
  abierta: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  faqs: FaqItem[] = [
    {
      pregunta: '¿Cómo creo una cuenta?',
      respuesta: 'Ve a la sección de Registro, completa tus datos y confirma tu correo electrónico.',
      abierta: false
    },
    {
      pregunta: '¿Qué hago si olvidé mi contraseña?',
      respuesta: 'Por ahora, contáctanos mediante la sección de Ayuda y Soporte para restablecerla.',
      abierta: false
    },
    {
      pregunta: '¿Mis datos están protegidos?',
      respuesta: 'Sí, tus datos se usan únicamente para el funcionamiento de la plataforma. Consulta la Política de Privacidad para más detalles.',
      abierta: false
    },
    {
      pregunta: '¿Puedo eliminar mi cuenta?',
      respuesta: 'Contáctanos mediante Ayuda y Soporte y procesaremos tu solicitud.',
      abierta: false
    }
  ];

  constructor(private location: Location) {}

  regresar() {
    this.location.back();
  }

  toggleFaq(item: FaqItem) {
    item.abierta = !item.abierta;
  }
}
