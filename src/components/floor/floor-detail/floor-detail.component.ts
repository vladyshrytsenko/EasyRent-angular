import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from '../../../service/floor.service';
import { CommonModule } from '@angular/common';
import { Floor } from '../../../model/floor';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModalComponent } from "../../image-modal/image-modal.component";
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ImageModalComponent],
  selector: 'app-floor-detail',
  templateUrl: './floor-detail.component.html',
  styleUrls: ['./floor-detail.component.css']
})
export class FloorDetailComponent implements OnInit {

  @ViewChild(ImageModalComponent) imageModal!: ImageModalComponent;
  floor!: Floor;
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private floorService: FloorService, 
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.floorService.getById(+id!).subscribe(data => {
      this.floor = data;
    });

  }

  public onUpdateFloor(id: number, photosInput: HTMLInputElement): void {
    const files: FileList | null = photosInput.files;
  
    if (files && files.length > 0) {

      this.floorService.update(id, this.floor, files).subscribe(
        (response: Floor) => {
          console.log('Floor updated successfully', response);
          this.floor = response;
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      alert('No photos selected');
    }
  } 
  
  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  
  activeTab: string = 'offices'; // default

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  getSanitizedSvg() {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,' + this.floor.svgPath);
  }

  getSanitizedImages(): any[] {
    const sanitizedImages = this.floor.photos.map(photo => {

      if (photo.startsWith('data:')) {
        return this.sanitizer.bypassSecurityTrustUrl(photo);
      }
  
      const isPng = photo.startsWith('iVBORw0KGgo');
      const isJpg = photo.startsWith('/9j/');
  
      let mimeType: string;
  
      if (isPng) {
        mimeType = 'image/png';
      } else if (isJpg) {
        mimeType = 'image/jpeg';
      } else {
        mimeType = 'application/octet-stream';
      }
  
      return this.sanitizer.bypassSecurityTrustUrl(`data:${mimeType};base64,${photo}`);
    });
  
    console.log(sanitizedImages);
    return sanitizedImages;
  }  
  
  onOfficeClick(officeId: number) {
    console.log('office selected with id: ', officeId);
  }
}
