import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService, CategoryLink } from '../../../services/post.service'; // Importar CategoryLink

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categoriesAtrac: CategoryLink[] = [];
  categoriesRegion: CategoryLink[] = [];

  // Lista de posts recientes (podría ser más dinámica)
  recentPosts = [
    { title: 'Aventura en los Alpes Suizos', link: '/posts/alpes-suizos-majestad-alpina-cumbres-lagos o aventura-alpes-suizos' },
    { title: 'Consejos para Viajar a Marruecos', link: '/posts/marruecos-viaje-sensorial-zocos-desiertos-tradicion o explorando-marruecos' },
    { title: 'Las 5 Mejores Playas del Caribe', link: '/posts/caribe-sol-playas-ensueno-ritmo-tropical o playas-paraisiacas-caribe' },
    { title: 'Japón: Tradición y Modernidad', link: '/posts/japon-tradicion-milenaria-modernidad-vibrante o descubriendo-japon' }
  ];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    const allCats = this.postService.getAllCategories();
    this.categoriesAtrac = allCats.atractivos;
    this.categoriesRegion = allCats.regiones;
  }
}