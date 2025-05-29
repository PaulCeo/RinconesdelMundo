import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importar
import { Subscription } from 'rxjs';
import { DestinationCardComponent } from '../../components/destination-card/destination-card.component';
import { PostService, Post, CategoryLink } from '../../services/post.service';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { ViewportScroller } from '@angular/common';

interface DestinationSummary {
  id: string; name: string; imageUrl: string; description: string; postLink: string; altText: string;
}

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent, DestinationCardComponent],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit, OnDestroy {

  postsInCategory: DestinationSummary[] = [];
  categoryNameDisplay: string | null = null;
  categoryTypeDisplay: string | null = null;
  isLoading: boolean = true;
  categoryNotFound: boolean = false;
  private routeSubscription: Subscription | undefined;
  private siteName = "Un Rincon del Mundo"; // Para no repetir

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private titleService: Title, // Inyectar
    private metaService: Meta    // Inyectar
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const categoryType = params.get('categoryType') as 'atractivo' | 'region' | null;
      const categorySlug = params.get('categorySlug');

      this.isLoading = true;
      this.categoryNotFound = false;
      this.postsInCategory = [];
      this.categoryNameDisplay = null;
      this.categoryTypeDisplay = null;
      this.viewportScroller.scrollToPosition([0,0]);

      if (categoryType && categorySlug) {
        const fetchedPosts = this.postService.getPostsByCategory(categoryType, categorySlug);

        if (fetchedPosts.length > 0) {
            let catNameForTitle = '';
            if (categoryType === 'region') {
                this.categoryNameDisplay = fetchedPosts[0].regionCategory.name;
                this.categoryTypeDisplay = "Región";
                catNameForTitle = fetchedPosts[0].regionCategory.name;
            } else if (categoryType === 'atractivo') {
                this.categoryNameDisplay = fetchedPosts[0].mainCategory.name;
                this.categoryTypeDisplay = "Atractivo";
                catNameForTitle = fetchedPosts[0].mainCategory.name;
            }

          // --- SET TITLE AND META ---
          const pageTitle = `Artículos sobre ${catNameForTitle} - ${this.siteName}`;
          this.titleService.setTitle(pageTitle);
          const metaDesc = `Descubre todos nuestros artículos y guías de viaje relacionados con ${this.categoryTypeDisplay?.toLowerCase()}: ${catNameForTitle}.`;
          this.metaService.updateTag({ name: 'description', content: metaDesc });
          this.metaService.updateTag({ property: 'og:title', content: pageTitle });
          this.metaService.updateTag({ property: 'og:description', content: metaDesc });
          this.metaService.updateTag({ property: 'og:url', content: `https://tu-dominio.com/categorias/${categoryType}/${categorySlug}` });
          // Para og:image, podrías tener una imagen genérica para categorías o intentar tomar la del primer post
          const ogImage = fetchedPosts[0].featuredImage ? `https://tu-dominio.com${fetchedPosts[0].featuredImage}` : `https://tu-dominio.com/assets/images/og-image-default.jpg`;
          this.metaService.updateTag({ property: 'og:image', content: ogImage });
          this.metaService.updateTag({ property: 'og:type', content: 'website' }); // O 'article.section'
          // --------------------------

          this.postsInCategory = fetchedPosts.map(post => ({
            id: post.slug.replace('post-', ''),
            name: this.formatPostTitle(post.title),
            imageUrl: post.cardImageUrl || post.featuredImage,
            description: this.extractShortDescription(post.body),
            postLink: `/posts/${post.slug}`,
            altText: `Imagen de ${this.formatPostTitle(post.title)}`
          }));
        } else {
          this.categoryNotFound = true;
          const displayCatName = this.formatDisplayNameFromSlug(categorySlug);
          this.titleService.setTitle(`Categoría ${displayCatName} no encontrada - ${this.siteName}`);
          this.metaService.updateTag({ name: 'description', content: `No se encontraron artículos para la categoría ${displayCatName}.`});
          this.categoryNameDisplay = displayCatName;
          this.categoryTypeDisplay = categoryType === 'region' ? 'Región' : 'Atractivo';
        }
      } else {
        this.categoryNotFound = true;
        this.titleService.setTitle(`Error de Categoría - ${this.siteName}`);
        this.metaService.updateTag({ name: 'description', content: "No se especificó una categoría para mostrar." });
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
    let shortDesc = paragraphMatch ? paragraphMatch[1] : 'Leer más sobre este artículo.';
    const maxLength = 130;
    if (shortDesc.length > maxLength) {
        let trimmed = shortDesc.substring(0, maxLength);
        trimmed = trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
        shortDesc = trimmed + '...';
    }
    return shortDesc.replace(/<[^>]*>/g, '');
  }

  private formatDisplayNameFromSlug(slug: string | null): string {
    if (!slug) return 'Categoría Desconocida';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToAnchor('page-top');
  }
}