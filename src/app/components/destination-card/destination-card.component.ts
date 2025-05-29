import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Interfaz simplificada (podría importarse)
interface DestinationSummary {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  postLink: string;
  altText: string;
}

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.css'] // Vacío si usa estilos globales
})
export class DestinationCardComponent {
  @Input() destinationData?: DestinationSummary; // Recibe los datos
}