import { Component, OnInit } from '@angular/core'; // Añadir OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Si usas ngModel en el futuro
import { HttpClient } from '@angular/common/http'; // Si usas AJAX
import { Title, Meta } from '@angular/platform-browser'; // Importar
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule si usas ngModel
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit { // Implementar OnInit

  private siteName = "Un Rincon del Mundo"; // Para no repetir
  // Para el formulario si usas AJAX y ngModel
  // formData = { name: '', email: '', _subject: '', message: '' };
  // formMessage = '';
  // formError = false;
  // isSubmitting = false;

  constructor(
    private viewportScroller: ViewportScroller,
    private titleService: Title, // Inyectar
    private metaService: Meta    // Inyectar
    // private http: HttpClient // Inyectar si usas AJAX
    ) { }

  ngOnInit(): void {
    const pageTitle = `Contacto - ${this.siteName}`;
    this.titleService.setTitle(pageTitle);
    const metaDesc = "Ponte en contacto con nosotros. Envíanos tus preguntas, sugerencias o propuestas para el blog de viajes.";
    this.metaService.updateTag({ name: 'description', content: metaDesc });
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: metaDesc });
    this.metaService.updateTag({ property: 'og:url', content: `https://rinconesdelmundo.net/contacto` });
    this.metaService.updateTag({ property: 'og:image', content: `https://rinconesdelmundo.net/images/assets/og-image-contacto.jpg` }); // Imagen general
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }


  // onSubmit(contactForm: HTMLFormElement): void { // Si usas AJAX
  //     // Lógica de envío AJAX
  // }

  scrollToTop(): void {
    this.viewportScroller.scrollToAnchor('page-top');
  }
}