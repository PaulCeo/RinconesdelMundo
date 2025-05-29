import { Component, OnInit, OnDestroy } from '@angular/core'; // Añadir OnDestroy
import { Title, Meta } from '@angular/platform-browser'; // <-- IMPORTAR Title y Meta
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { PostService, Post } from '../../services/post.service';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { Subscription } from 'rxjs'; // Para limpiar suscripciones

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [ CommonModule, RouterLink, SidebarComponent ],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post | null | undefined = undefined;
  isLoading: boolean = true;
  postNotFound: boolean = false;
  private routeSubscription: Subscription | undefined; // Para limpiar suscripción a ruta

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private titleService: Title, // <-- INYECTAR Title
    private metaService: Meta    // <-- INYECTAR Meta
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => { // Guardar suscripción
      const slug = params.get('slug');
      this.isLoading = true;
      this.postNotFound = false;
      this.post = null;
      this.viewportScroller.scrollToPosition([0, 0]);

      setTimeout(() => { // Simulación de carga
          if (slug) {
            this.post = this.postService.getPostBySlug(slug);
            if (this.post) {
              // --- ESTABLECER TÍTULO Y METADATOS ---
              const pageTitle = `${this.post.title} - Mi Blog de Viajes`;
              this.titleService.setTitle(pageTitle);
              // Crear una meta descripción a partir del cuerpo del post (primeros ~155 caracteres)
              const metaDesc = this.generateMetaDescription(this.post.body);
              this.metaService.updateTag({ name: 'description', content: metaDesc });

              // Open Graph Tags
              this.metaService.updateTag({ property: 'og:title', content: this.post.title });
              this.metaService.updateTag({ property: 'og:description', content: metaDesc });
              this.metaService.updateTag({ property: 'og:type', content: 'article' });
              // Asegúrate de que la URL de la imagen sea absoluta y accesible públicamente
              this.metaService.updateTag({ property: 'og:image', content: `https://tu-dominio.com${this.post.featuredImage}` });
              this.metaService.updateTag({ property: 'og:url', content: `https://tu-dominio.com/posts/${this.post.slug}` });
              // Opcional: Tags de artículo para Open Graph
              if(this.post.mainCategory) this.metaService.addTag({ property: 'article:section', content: this.post.mainCategory.name });
              if(this.post.regionCategory) this.metaService.addTag({ property: 'article:tag', content: this.post.regionCategory.name });
              // this.metaService.addTag({ property: 'article:published_time', content: '2023-10-20T00:00:00Z' }); // Si tienes fecha
              // ------------------------------------
            } else {
              this.titleService.setTitle('Artículo no Encontrado - Mi Blog de Viajes');
              this.metaService.updateTag({ name: 'description', content: 'El artículo que buscas no se encuentra en nuestro blog de viajes.' });
              this.postNotFound = true;
            }
          } else {
            this.titleService.setTitle('Error - Mi Blog de Viajes');
            this.metaService.updateTag({ name: 'description', content: 'Hubo un error al cargar esta página.' });
            this.postNotFound = true;
          }
          this.isLoading = false;
      }, 50);
    });
  }

  ngOnDestroy(): void { // Limpiar suscripción
      if (this.routeSubscription) {
          this.routeSubscription.unsubscribe();
      }
  }

  // Función para generar la meta descripción (simple)
  private generateMetaDescription(htmlBody: string, maxLength: number = 155): string {
    // Quitar HTML y luego espacios múltiples, luego cortar
    let text = htmlBody.replace(/<[^>]+>/g, ' ').replace(/\s\s+/g, ' ').trim();
    if (text.length > maxLength) {
      text = text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }

  scrollToTop(): void { this.viewportScroller.scrollToAnchor('page-top'); }
}