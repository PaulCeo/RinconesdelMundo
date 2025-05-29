import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToTop(): void {
    this.viewportScroller.scrollToAnchor('page-top');
    // o this.viewportScroller.scrollToPosition([0, 0]);
  }
}