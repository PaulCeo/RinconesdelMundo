import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Importar Title y Meta
import { PostService } from '../../services/post.service';
import { ViewportScroller } from '@angular/common';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';

interface RegionLink {
  name: string;
  slug: string;
  imageUrl: string;
  shortDescription: string;
}

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [ CommonModule, RouterLink, SidebarComponent ],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  regions: RegionLink[] = [];
  private siteName = "Un Rincon del Mundo"; // Para no repetir

  // Nombres de región SIN TILDES para las claves y la visualización
  // Descripciones un poco más extensas
  private regionDetails: { [key: string]: { displayName: string, description: string, imageUrl: string } } = {
    'africa': {
        displayName: 'Africa',
        description: 'Cuna de la humanidad, ofrece safaris épicos, desiertos vastos, ricas culturas ancestrales y costas impresionantes. Una inmersión en la naturaleza salvaje.',
        imageUrl: '/images/regions/africa.jpg'
    },
    'america-central': { // Incluirá Caribe aquí
        displayName: 'America Central y Caribe',
        description: 'Volcanes activos, selvas exuberantes, ruinas mayas y playas paradisíacas bañadas por dos océanos. Un crisol de culturas y belleza natural.',
        imageUrl: '/images/regions/america-central.jpg'
    },
    'america-del-norte': {
        displayName: 'America del Norte',
        description: 'Desde cañones imponentes y parques nacionales hasta metrópolis vibrantes y costas diversas que se extienden por miles de kilómetros.',
        imageUrl: '/images/regions/america-norte.jpg'
    },
    'america-del-sur': {
        displayName: 'America del Sur',
        description: 'Majestuosas montañas andinas, la vasta selva amazónica, ciudades coloniales llenas de historia y una rica herencia cultural y gastronómica.',
        imageUrl: '/images/regions/america-sur.jpg'
    },
    'asia': {
        displayName: 'Asia',
        description: 'Un continente de contrastes asombrosos: templos milenarios, tecnología futurista, paisajes que van de picos nevados a desiertos y gastronomías exóticas.',
        imageUrl: '/images/regions/asia.jpg'
    },
    // 'caribe' se elimina como clave principal, se incluye en 'america-central'
    'europa': {
        displayName: 'Europa',
        description: 'Un tesoro de historia en cada rincón, con ciudades icónicas, arte sublime, paisajes variados desde fiordos hasta playas mediterráneas y una rica diversidad cultural.',
        imageUrl: '/images/regions/europa.jpg'
    },
    'oceania': {
        displayName: 'Oceania',
        description: 'Aventuras en las antípodas, desde los desiertos y arrecifes de Australia hasta los paisajes épicos de Nueva Zelanda y las idílicas islas del Pacífico.',
        imageUrl: '/images/regions/oceania.jpg'
    },
    'oriente-medio': {
        displayName: 'Oriente Medio',
        description: 'Cruce de civilizaciones milenarias, esta región ofrece un viaje a través de la historia bíblica, desiertos legendarios y ciudades antiguas.',
        imageUrl: '/images/regions/oriente-medio.jpg'
    }
  };


   constructor(
    private postService: PostService,
    private viewportScroller: ViewportScroller,
    private titleService: Title, // Inyectar Title
    private metaService: Meta    // Inyectar Meta
    ) { }

  ngOnInit(): void {
    const pageTitle = `Explora Regiones del Mundo - ${this.siteName}`;
    this.titleService.setTitle(pageTitle);
    const metaDesc = "Descubre guías de viaje por continentes y regiones. Encuentra inspiración para tu próxima aventura en África, Asia, Europa, América y más.";
    this.metaService.updateTag({ name: 'description', content: metaDesc });
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: metaDesc });
    this.metaService.updateTag({ property: 'og:url', content: `https://tu-dominio.com/destinos` }); // URL Canónica
    this.metaService.updateTag({ property: 'og:image', content: `https://tu-dominio.com/assets/images/og-image-destinos.jpg` }); // Imagen general para esta página
    this.metaService.updateTag({ property: 'og:type', content: 'website' });


    const allPosts = this.postService.getAllPosts();
    const regionNames = new Set(allPosts.map(post => this.createSlug(post.regionCategory.name)).filter(regionSlug => !!regionSlug));

    this.regions = Array.from(regionNames).map(slug => {
      const details = this.regionDetails[slug] ||
                      {
                        displayName: this.formatDisplayNameFromSlug(slug),
                        description: `Explora los diversos destinos y culturas que ofrece ${this.formatDisplayNameFromSlug(slug)}.`,
                        imageUrl: 'https://via.placeholder.com/300x200/cccccc/888888?text=Region'
                      };
      return {
        name: details.displayName,
        slug: slug,
        imageUrl: details.imageUrl,
        shortDescription: details.description
      };
    }).sort((a,b) => a.name.localeCompare(b.name));
  }

  private createSlug(regionName: string): string {
    if (!regionName) return '';
    return regionName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  private formatDisplayNameFromSlug(slug: string): string {
    if (!slug) return 'Región Desconocida';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  scrollToTop(): void {
     this.viewportScroller.scrollToAnchor('page-top');
  }
}