import { Component, OnInit, OnDestroy } from '@angular/core'; // Añadir OnDestroy
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importar Title y Meta
import { Subscription } from 'rxjs'; // Para limpiar suscripción
import { DestinationCardComponent } from '../../components/destination-card/destination-card.component';
import { PostService, Post } from '../../services/post.service';
import { ViewportScroller } from '@angular/common';

interface DestinationSummary {
  id: string; name: string; imageUrl: string; description: string; postLink: string; altText: string;
}

@Component({
  selector: 'app-region-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DestinationCardComponent],
  templateUrl: './region-page.component.html',
  styleUrls: ['./region-page.component.css']
})
export class RegionPageComponent implements OnInit, OnDestroy { // Implementar OnDestroy

  currentRegionName: string | null = null;
  currentRegionSlug: string | null = null;
  destinationsInRegion: DestinationSummary[] = [];
  isLoading: boolean = true;
  regionNotFound: boolean = false;
  private routeSubscription: Subscription | undefined;
  private siteName = "Un Rincon del Mundo"; // Para no repetir

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private titleService: Title, // Inyectar Title
    private metaService: Meta    // Inyectar Meta
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      this.regionNotFound = false;
      this.destinationsInRegion = [];
      this.currentRegionName = null;

      const regionParamSlug = params.get('regionName');
      this.currentRegionSlug = regionParamSlug;
      this.viewportScroller.scrollToPosition([0,0]);

      if (regionParamSlug) {
        const allPosts = this.postService.getAllPosts();
        const postsOfRegion = allPosts.filter(post =>
          post.regionCategory && post.regionCategory.slug === regionParamSlug
        );

        if (postsOfRegion.length > 0) {
          this.currentRegionName = postsOfRegion[0].regionCategory.name; // Nombre legible de la región

          // --- SET TITLE AND META ---
          const pageTitle = `Destinos en ${this.currentRegionName} - ${this.siteName}`;
          this.titleService.setTitle(pageTitle);
          const metaDesc = `Explora los mejores destinos y artículos de viaje sobre ${this.currentRegionName}. Guías, consejos y experiencias en ${this.siteName}.`;
          this.metaService.updateTag({ name: 'description', content: metaDesc });
          this.metaService.updateTag({ property: 'og:title', content: pageTitle });
          this.metaService.updateTag({ property: 'og:description', content: metaDesc });
          this.metaService.updateTag({ property: 'og:url', content: `https://tu-dominio.com/destinos/${regionParamSlug}` });
          this.metaService.updateTag({ property: 'og:image', content: `https://tu-dominio.com/assets/images/regions/${regionParamSlug}-og.jpg` }); // Imagen específica para la región
          // --------------------------

          this.destinationsInRegion = postsOfRegion.map(post => ({
            id: post.slug.replace('post-', ''),
            name: this.formatPostTitle(post.title),
            imageUrl: post.cardImageUrl || post.featuredImage,
            description: this.extractShortDescription(post.body),
            postLink: `/posts/${post.slug}`,
            altText: `Imagen de ${this.formatPostTitle(post.title)}`
          }));
        } else {
          this.regionNotFound = true;
          const displayRegion = this.formatDisplayNameFromSlug(regionParamSlug);
          this.titleService.setTitle(`Región ${displayRegion} no encontrada - ${this.siteName}`);
          this.metaService.updateTag({ name: 'description', content: `No se encontraron destinos para la región ${displayRegion}.` });
          this.currentRegionName = displayRegion;
        }
      } else {
        this.regionNotFound = true;
        this.titleService.setTitle(`Error de Región - ${this.siteName}`);
        this.metaService.updateTag({ name: 'description', content: "No se especificó una región para mostrar." });
      }
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
      if (this.routeSubscription) {
          this.routeSubscription.unsubscribe();
      }
  }

  private formatPostTitle(title: string): string {
    return title.split(/[:–—]/)[0].trim();
  }

  private extractShortDescription(htmlBody: string): string {
    const paragraphMatch = htmlBody.match(/<p>(.*?)<\/p>/i);
    let shortDesc = paragraphMatch ? paragraphMatch[1] : 'Descubre más sobre este fascinante destino.';
    const maxLength = 130;
    if (shortDesc.length > maxLength) {
        let trimmed = shortDesc.substring(0, maxLength);
        trimmed = trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
        shortDesc = trimmed + '...';
    }
    return shortDesc.replace(/<[^>]*>/g, '');
  }

  private formatDisplayNameFromSlug(slug: string | null): string {
    if (!slug) return 'Región Desconocida';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToAnchor('page-top');
  }
}