import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Floor } from '../../model/floor';
import { FloorService } from '../../service/floor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';

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
  public floorSvgContents: string[] = [];
  public admin!: boolean;

  constructor(
    private floorService: FloorService, 
    private router: Router, 
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    // await this.isAdmin();
    this.findAllFloors();  
  }

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
        console.log('floors: ', response);

        this.floorSvgContents = [];

        response.forEach(floor => {
          this.floorSvgContents.push('data:image/svg+xml;base64,' + floor.svgPath);
        });
      },
      error => {
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

  private async isAdmin(): Promise<boolean> {
    return await this.userService.isAdmin();
  }
  
}
