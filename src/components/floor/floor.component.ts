import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Floor } from '../../model/floor';
import { FloorService } from '../../service/floor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent implements OnInit {

  public floor!: Floor;
  public floors!: Floor[];

  sanitizedSvg: SafeResourceUrl | null = null;

  constructor(private floorService: FloorService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.findAllFloors();
    for (let i = 0; i < this.floors.length; i++) {
      this.sanitizedSvg = this.sanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,' + this.floors[i].svgPath);
    }
    // this.sanitizedSvg = this.sanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,' + this.floor.svgPath);
  }

  // getSanitizedSvg() {
  //   return this.sanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,' + this.floor.svgPath);
  // }

  viewFloor(id: number): void {
    this.router.navigate([`/floors/${id}`]);
  }

  public getFloorById(id: number): void {
    this.floorService.getById(id).subscribe( 
      (response: Floor) => {
        this.floor = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );
  }

  public findAllFloors(): void {
    this.floorService.findAll().subscribe( 
      (response: Floor[]) => {
        this.floors = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );
  }

  public addFloor(floor: Floor): void {
    this.floorService.create(floor).subscribe(
      (response: Floor) => {
        this.floor = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public updateFloorById(id: number, floor: Floor): void {
    this.floorService.update(id, floor).subscribe(
      (response: Floor) => {
        this.floor = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteFloorById(id: number): void {
    this.floorService.deleteById(id).subscribe(
      (response) => {
        console.log('Floor deleted successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
