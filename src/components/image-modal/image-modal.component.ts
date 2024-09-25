import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css'
})
export class ImageModalComponent {

  @Input() imageUrl: string = '';
  isOpen: boolean = false;

  open(image: string) {
    this.imageUrl = image;
    this.isOpen = true;
    console.log('Modal opened with image:', image);
  }

  close() {
    this.isOpen = false;
    console.log('Modal closed');
  }
}
