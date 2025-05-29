import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService, Post } from '../../services/post.service';
import { TipDataService, TipDetail, SearchedTip } from '../../services/tip-data.service';
import { SearchResultCardComponent, SearchResult } from '../../components/search-result-card/search-result-card.component';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchResultCardComponent, SidebarComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  searchQuery: string | null = null;
  searchResults: SearchResult[] = [];
  isLoading: boolean = true;
  noResults: boolean = false;

  private queryParamsSubscription: Subscription | undefined;

  // --- PROPIEDADES PARA EL MODAL DE CONSEJOS (AÑADIDAS/CORREGIDAS) ---
  isModalActive: boolean = false;               // <-- Declarar esta propiedad
  selectedTipDetail: TipDetail | null = null;   // <-- Declarar esta propiedad
  // -------------------------------------------------------------------

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private tipDataService: TipDataService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParamMap.subscribe(params => {
      const query = params.get('q');
      this.searchQuery = query;
      this.searchResults = [];
      this.isLoading = true;
      this.noResults = false;
      this.viewportScroller.scrollToPosition([0,0]);

      if (query && query.trim() !== '') {
        this.performSearch(query);
      } else {
        this.isLoading = false;
        this.noResults = true;
      }
    });
  }

  performSearch(query: string): void {
    const postsFound: Post[] = this.postService.searchPosts(query);
    const tipsFound: SearchedTip[] = this.tipDataService.searchTips(query);

    postsFound.forEach(post => {
  this.searchResults.push({
    type: 'Post',
    title: post.title,
    link: `/posts/${post.slug}`,
    // --- LÓGICA ACTUALIZADA PARA IMAGEN DE TARJETA (si SearchResultCard la usara) ---
    // Si SearchResultCardComponent muestra una imagen, deberías añadir una propiedad
    // imageUrl a la interfaz SearchResult y asignarla aquí:
    // imageUrl: post.cardImageUrl || post.featuredImage,
    // ----------------------------------------------------------------------------
    contextSnippet: this.generateSnippet(post.body, query),
    originalQuery: query
  });
    });

    tipsFound.forEach(tip => {
      this.searchResults.push({
        type: 'Consejo',
        title: tip.title,
        link: '/consejos',
        fragmentLink: tip.id,
        contextSnippet: this.generateSnippet(tip.body, query),
        originalQuery: query
      });
    });

    this.isLoading = false;
    this.noResults = this.searchResults.length === 0;
  }

  private generateSnippet(content: string, query: string, wordsAround: number = 15): string {
    const plainText = content.replace(/<[^>]+>/g, ' ');
    const lowerCaseText = plainText.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    const queryIndex = lowerCaseText.indexOf(lowerCaseQuery);
    if (queryIndex === -1) {
      const words = plainText.trim().split(/\s+/);
      return words.slice(0, wordsAround * 2 + query.split(/\s+/).length).join(' ') + (words.length > (wordsAround * 2 + query.split(/\s+/).length) ? '...' : '');
    }
    let startIndex = queryIndex; let wordsBeforeCount = 0;
    while (startIndex > 0 && wordsBeforeCount < wordsAround) { startIndex--; if (plainText[startIndex] === ' ' && plainText[startIndex-1] !== ' ') { wordsBeforeCount++; } }
    if (startIndex > 0 && plainText[startIndex-1] !== ' ') startIndex = plainText.lastIndexOf(' ', startIndex) + 1; else if (startIndex > 0) startIndex++;
    let endIndex = queryIndex + query.length; let wordsAfterCount = 0;
    while (endIndex < plainText.length && wordsAfterCount < wordsAround) { endIndex++; if (plainText[endIndex] === ' ' && plainText[endIndex+1] !== ' ') { wordsAfterCount++; } }
    if (endIndex < plainText.length && plainText[endIndex] !== ' ') endIndex = plainText.indexOf(' ', endIndex); if (endIndex === -1) endIndex = plainText.length;
    let snippet = plainText.substring(startIndex, endIndex).trim();
    if (startIndex > 0) { snippet = '... ' + snippet; } if (endIndex < plainText.length) { snippet = snippet + ' ...'; }
    const regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
    return snippet;
  }

  // --- MÉTODOS PARA EL MODAL DE CONSEJOS (Asegurar que están completos) ---
  openTipModalFromSearch(tipId: string): void {
    // console.log('SearchPage: Abriendo modal para tipId:', tipId);
    const tipDetailFromService = this.tipDataService.getTipDetailById(tipId); // Renombrar para evitar confusión
    if (tipDetailFromService) { // Comprobar si el servicio devolvió algo
        this.selectedTipDetail = tipDetailFromService; // Asignar a la propiedad de la clase
        this.isModalActive = true;
        document.body.classList.add('modal-open');
    } else {
         console.warn(`No se encontró contenido para el tip-id: ${tipId} en SearchPageComponent`);
    }
  }

  closeTipModal(): void {
    this.isModalActive = false;
    this.selectedTipDetail = null;
    const mainMenu = document.getElementById('main-menu');
    if (!mainMenu?.classList.contains('mobile-menu-active')) {
       document.body.classList.remove('modal-open');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isModalActive) {
        this.closeTipModal();
    }
  }
  // -----------------------------------------------------------------------

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToAnchor('page-top');
  }
}