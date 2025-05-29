import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Solo RouterOutlet
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { CommonModule } from '@angular/common'; // No es estrictamente necesario aquí

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // CommonModule, // No se usa directamente en la plantilla
    RouterOutlet,
    HeaderComponent,
    FooterComponent
    // RouterLink y RouterLinkActive no son necesarios aquí
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}