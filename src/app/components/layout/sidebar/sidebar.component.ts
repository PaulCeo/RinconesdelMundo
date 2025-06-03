// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService, Post, CategoryLink } from '../../../services/post.service'; // Ajusta la ruta

interface RecentPostDisplay {
  // title: string; // Ya no usaremos el título completo aquí
  destinationName: string; // Nuevo campo para el nombre del destino
  link: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categoriesAtrac: CategoryLink[] = [];
  categoriesRegion: CategoryLink[] = [];
  recentPostsForDisplay: RecentPostDisplay[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    const categories = this.postService.getAllCategories();
    this.categoriesAtrac = categories.atractivos;
    this.categoriesRegion = categories.regiones;

    const rawRecentPosts = this.postService.getRecentPosts(4);
    this.recentPostsForDisplay = rawRecentPosts.map(post => {
      let destinationName = post.title; // Por defecto, el título completo
      const separatorIndex = post.title.indexOf(':'); // Busca el primer ':'

      if (separatorIndex > 0) {
        destinationName = post.title.substring(0, separatorIndex).trim();
      }
      // Opcional: si algunos títulos no tienen ":" pero el destino es la primera palabra
      // else {
      //   const firstWordMatch = post.title.match(/^([^\s]+)/);
      //   if (firstWordMatch) {
      //     destinationName = firstWordMatch[0];
      //   }
      // }

      // Considerar casos especiales como "Nueva Zelanda (Aotearoa)"
      // Podrías querer que solo diga "Nueva Zelanda"
      if (destinationName.includes(' (')) {
        destinationName = destinationName.substring(0, destinationName.indexOf(' (')).trim();
      }
      // Casos especiales que necesitan ajuste manual si la lógica anterior no es suficiente
      if (destinationName.toLowerCase().includes('rocosas canadienses')) {
        destinationName = 'Rocosas Canadienses';
      } else if (destinationName.toLowerCase().includes('alpes suizos')) {
        destinationName = 'Alpes Suizos';
      } // Añade más casos especiales si es necesario


      return {
        destinationName: destinationName,
        link: this.postService.getPostLink(post)
      };
    });

    console.log('Posts Recientes para Sidebar:', this.recentPostsForDisplay);
  }
}