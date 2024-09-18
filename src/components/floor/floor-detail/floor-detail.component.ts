import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from '../../../service/floor.service';
import { CommonModule } from '@angular/common';
import { Floor } from '../../../model/floor';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-floor-detail',
  templateUrl: './floor-detail.component.html',
  styleUrls: ['./floor-detail.component.css']
})
export class FloorDetailComponent implements OnInit {
  floor!: Floor;

  constructor(private route: ActivatedRoute, private floorService: FloorService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.floorService.getById(+id!).subscribe(data => {
      this.floor = data;
    });

    // (window as any).handleOfficeClick = this.onOfficeClick.bind(this);
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

  onOfficeClick(officeId: number) {
    console.log('office selected with id: ', officeId);
  }
}
