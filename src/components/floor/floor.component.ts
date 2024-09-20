import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Floor } from '../../model/floor';
import { FloorService } from '../../service/floor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  ngOnInit(): void {
    this.userService.isAdmin().subscribe(
      (isAdmin: boolean) => {
        this.admin = isAdmin;
      },
      error => {
        console.error('Error checking admin status:', error);
        this.admin = false;
      }
    );
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

  public onUpdateFloor(id: number, editFloorForm: NgForm): void {
    console.log('entry point onUpdateFloor');

    this.floor = editFloorForm.value;

    this.floorService.update(id, this.floor).subscribe(
      (response: Floor) => {
        console.log('Floor updated successfully', response);

        this.floor = response;
        // this.router.navigate(['/floors']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteFloor(id: number): void {
    console.log('entry point onDeleteFloor');

    this.floorService.deleteById(id).subscribe(
      (response) => {
        console.log('Floor deleted successfully');

      this.findAllFloors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // private async isAdmin(): Promise<boolean> {
  //   return await this.userService.isAdmin();
  // }
  
}
