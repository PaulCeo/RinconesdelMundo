import { Component, AfterViewInit, OnDestroy, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// --- IMPORTAR TipCardComponent y TipSummary ---
import { TipCardComponent, TipSummary } from '../../components/tip-card/tip-card.component';
// ---------------------------------------------
import { TipDataService, TipDetail } from '../../services/tip-data.service';
import {Title, Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
      CommonModule,
      RouterLink,
      TipCardComponent // <-- AÑADIR TipCardComponent AQUÍ
    ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  private swiperInstance: Swiper | null = null;
  isModalActive: boolean = false;
  selectedTipDetail: TipDetail | null = null;
  featuredTipSummaries: TipSummary[] = [];

    constructor(
    private tipDataService: TipDataService,
    private titleService: Title, // <-- INYECTAR Title
    private metaService: Meta    // <-- INYECTAR Meta
  ) {}

 ngOnInit(): void {
    // Establecer Título y Meta Descripción para la Home
    this.titleService.setTitle('Un Rincon del Mundo - Explora el Mundo, Un Viaje a la Vez'); // O tu título principal
    this.metaService.updateTag({
      name: 'description',
      content: 'Descubre destinos increíbles, consejos prácticos y relatos inspiradores para tu próxima aventura. El blog de viajes para almas curiosas.'
    });
    // Opcional: Open Graph Tags para redes sociales
    this.metaService.updateTag({ property: 'og:title', content: 'Un Rincon del Mundo - Explora el Mundo, Un Viaje a la Vez' });
    this.metaService.updateTag({ property: 'og:description', content: 'Inspiración y guías para tus aventuras por el mundo.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://tu-dominio.com/assets/images/og-image-home.jpg' }); // URL absoluta a una imagen representativa
    this.metaService.updateTag({ property: 'og:url', content: 'https://tu-dominio.com/' }); // URL canónica de la home
    this.metaService.updateTag({ property: 'og:type', content: 'website' });


    // Cargar los resúmenes de los 3 consejos destacados
    const featuredTipIds = ['equipaje', 'seguro', 'cultura'];
    this.featuredTipSummaries = featuredTipIds
        .map(id => {
            const detail = this.tipDataService.getTipDetailById(id);
            if (detail) {
                return { id: id, title: detail.title, shortDescription: this.extractShortDescription(detail.body) };
            }
            return null;
        })
        .filter(tip => tip !== null) as TipSummary[];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        const swiperEl = document.querySelector('.hero-swiper') as HTMLElement;
        if (swiperEl) {
            this.swiperInstance = new Swiper(swiperEl, {
              modules: [Navigation, Pagination, Autoplay],
              direction: 'horizontal', loop: true,
              autoplay: { delay: 5000, disableOnInteraction: false },
              pagination: { el: '.swiper-pagination', clickable: true },
              navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
              effect: 'slide', grabCursor: true,
            });
        } else { console.warn("Elemento .hero-swiper no encontrado."); }
    }, 0);
  }

  ngOnDestroy(): void {
     if (this.swiperInstance) {
         this.swiperInstance.destroy(true, true);
         this.swiperInstance = null;
     }
  }

   private extractShortDescription(htmlBody: string): string {
        const paragraphMatch = htmlBody.match(/<p>(.*?)<\/p>/i);
        let shortDesc = paragraphMatch ? paragraphMatch[1] : 'Haz clic para leer más detalles...';
        const maxLength = 120;
        if (shortDesc.length > maxLength) {
            let trimmed = shortDesc.substring(0, maxLength);
            trimmed = trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
            shortDesc = trimmed + '...';
        }
        return shortDesc.replace(/<[^>]*>/g, '');
   }

  openModal(tipId: string): void {
    const tipDetail = this.tipDataService.getTipDetailById(tipId);
    if (tipDetail) {
      this.selectedTipDetail = tipDetail;
      this.isModalActive = true;
      document.body.classList.add('modal-open');
    } else { console.warn(`No se encontró contenido para el tip-id: ${tipId} en HomeComponent`); }
  }

  closeModal(): void {
    this.isModalActive = false;
    this.selectedTipDetail = null;
    const mainMenu = document.getElementById('main-menu');
    if (!mainMenu?.classList.contains('mobile-menu-active')) {
       document.body.classList.remove('modal-open');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isModalActive) { this.closeModal(); }
  }
}