import { Component, Input, Output, EventEmitter } from '@angular/core'; // Añadir Output, EventEmitter
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface SearchResult {
  type: 'Post' | 'Consejo';
  title: string;
  link: string;
  fragmentLink?: string; // ID del tip para el modal
  contextSnippet: string;
  originalQuery?: string;
}

@Component({
  selector: 'app-search-result-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.css']
})
export class SearchResultCardComponent {
  @Input() result?: SearchResult;
  // --- NUEVO OUTPUT ---
  @Output() openTip = new EventEmitter<string>(); // Emitirá el ID del consejo
  // -------------------

  // Opcional: highlightQuery (sin cambios)
  highlightQuery(text: string, query?: string): string {
    if (!query || !text) return text;
    const regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  }

  // --- NUEVO MÉTODO PARA MANEJAR CLIC EN TARJETA DE CONSEJO ---
  onCardClick(): void {
    if (this.result && this.result.type === 'Consejo' && this.result.fragmentLink) {
      this.openTip.emit(this.result.fragmentLink); // Emitir el ID del consejo (fragmentLink)
    }
    // Si es un Post, el routerLink se encargará
  }
  // -----------------------------------------------------------
}