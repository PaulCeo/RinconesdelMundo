import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMobileMenuOpen = false;
  isSearchActive = false;
  searchQuery = '';
  hideNavAndTitleForSearch = false; // Para controlar visibilidad de H1 y Nav principal

  private routerSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Para verificar si estamos en el navegador
  ) {}

  ngOnInit(): void {
    // Solo suscribirse a eventos del router en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.routerSubscription = this.router.events.pipe(
        filter((event: RouterEvent): event is NavigationStart => event instanceof NavigationStart)
      ).subscribe(() => {
        this.closeMenuIfNeeded();
        this.closeSearchIfNeeded();
      });
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Si el menú se abre y la búsqueda estaba activa, cierra la búsqueda
    if (this.isMobileMenuOpen && this.isSearchActive) {
        this.isSearchActive = false;
        this.hideNavAndTitleForSearch = false; // Mostrar H1/Nav de nuevo
    }
    this.updateDOMForMobileMenu();
    this.updateBodyScrollStatus();
  }

  closeMenuIfNeeded(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.updateDOMForMobileMenu();
      this.updateBodyScrollStatus();
    }
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
    this.hideNavAndTitleForSearch = this.isSearchActive; // Actualizar estado para ocultar/mostrar H1 y Nav

    // Si la búsqueda se abre y el menú móvil estaba activo, cierra el menú
    if (this.isSearchActive && this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
        this.updateDOMForMobileMenu(); // Actualiza el estado visual de la hamburguesa
    }
    this.updateBodyScrollStatus();

    if (this.isSearchActive && isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
            const searchInput = document.querySelector('.search-bar-container input[type="search"]') as HTMLInputElement;
            searchInput?.focus();
        }, 50);
    }
  }

  closeSearchIfNeeded(): void {
      if (this.isSearchActive) {
          this.isSearchActive = false;
          this.hideNavAndTitleForSearch = false;
          this.updateBodyScrollStatus();
      }
  }

  closeSearch(): void { // Llamado por el botón X de la barra de búsqueda
    this.isSearchActive = false;
    this.hideNavAndTitleForSearch = false;
    this.updateBodyScrollStatus();
  }

  performSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/buscar'], { queryParams: { q: query } });
      // No cerramos la búsqueda aquí inmediatamente, se cerrará por el evento de navegación en ngOnInit
      // o si el usuario pulsa Escape o el botón X.
      // this.closeSearch(); // Opcional: cerrar inmediatamente
      // this.searchQuery = '';
    } else {
        this.closeSearch(); // Si la query está vacía, simplemente cierra la barra
    }
  }

   @HostListener('document:keydown.escape', ['$event'])
   onEscapeKey(event: KeyboardEvent): void {
       // La lógica de cambio de estado se maneja aquí
       let stateChanged = false;
       if (this.isMobileMenuOpen) {
           this.isMobileMenuOpen = false;
           stateChanged = true;
       }
       if (this.isSearchActive) {
           this.isSearchActive = false;
           this.hideNavAndTitleForSearch = false;
           stateChanged = true;
       }
       // Actualizar el DOM solo si el estado cambió y estamos en el navegador
       if (stateChanged && isPlatformBrowser(this.platformId)) {
           this.updateDOMForMobileMenu(); // Actualiza el botón hamburguesa
           this.updateBodyScrollStatus();
       }
   }

   // Método para actualizar los atributos del botón hamburguesa (DOM)
   private updateDOMForMobileMenu(): void {
       if (isPlatformBrowser(this.platformId)) {
           const hamburgerButton = document.getElementById('hamburger-button');
           if (hamburgerButton) {
               hamburgerButton.setAttribute('aria-expanded', this.isMobileMenuOpen.toString());
               hamburgerButton.setAttribute('aria-label', this.isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú');
               hamburgerButton.classList.toggle('is-active', this.isMobileMenuOpen);
               // Ocultar o mostrar hamburguesa si la búsqueda está activa
               hamburgerButton.classList.toggle('hidden-by-search', this.isSearchActive && !this.isMobileMenuOpen);
           }
            // Ocultar o mostrar el botón de toggle de búsqueda
           const searchToggleButton = document.querySelector('.search-toggle-btn') as HTMLElement;
           if (searchToggleButton) {
               searchToggleButton.classList.toggle('hidden-by-search', this.isSearchActive && !this.isMobileMenuOpen);
           }
       }
   }

   // Método para actualizar el scroll del body (DOM)
   private updateBodyScrollStatus(): void {
       if (isPlatformBrowser(this.platformId)) {
           const body = document.body;
           const tipModal = document.getElementById('tip-modal'); // Asumiendo que el modal de tips tiene este ID globalmente
                                                                 // o el ID específico de cada página si es diferente.

           if (this.isMobileMenuOpen || this.isSearchActive || tipModal?.classList.contains('is-active')) {
               body.classList.add('modal-open');
           } else {
               body.classList.remove('modal-open');
           }
       }
   }
}