import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { TipsComponent } from './pages/tips/tips.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegionPageComponent } from './pages/region-page/region-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component'; // Asegúrate que esté importado

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Inicio - Mi Blog de Viajes' },
    {
        path: 'destinos',
        children: [
            { path: '', component: DestinationsComponent, title: 'Regiones - Mi Blog de Viajes' },
            { path: ':regionName', component: RegionPageComponent, title: 'Destinos por Región' }
        ]
    },
    { path: 'consejos', component: TipsComponent, title: 'Consejos - Mi Blog de Viajes' },
    { path: 'posts/:slug', component: PostDetailComponent, title: 'Artículo - Mi Blog de Viajes' },
    {
        path: 'categorias/:categoryType/:categorySlug',
        component: CategoryPageComponent,
        title: 'Posts por Categoría'
    },
    { path: 'contacto', component: ContactComponent, title: 'Contacto - Mi Blog de Viajes' },

    // --- RUTA AÑADIDA PARA BÚSQUEDA ---
    { path: 'buscar', component: SearchPageComponent, title: 'Resultados de Búsqueda' },
    // -----------------------------------

    // { path: 'galeria', component: GalleryComponent, title: 'Galería - Mi Blog de Viajes' },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];