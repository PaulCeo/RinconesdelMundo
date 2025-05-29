// src/app/components/tip-card/tip-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf

// Exportar la interfaz para que otros componentes puedan usarla
export interface TipSummary {
  id: string;
  title: string;
  shortDescription: string;
}

@Component({
  selector: 'app-tip-card',
  standalone: true, // Debe ser standalone
  imports: [CommonModule], // Para *ngIf
  templateUrl: './tip-card.component.html',
  styleUrls: ['./tip-card.component.css']
})
export class TipCardComponent {
  @Input() tipSummary?: TipSummary;
  @Output() cardClick = new EventEmitter<string>();

  onCardClick(): void {
    if (this.tipSummary) {
      this.cardClick.emit(this.tipSummary.id);
    }
  }
}