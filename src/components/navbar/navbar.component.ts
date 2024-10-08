import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Floor } from '../../model/floor';
import { FloorService } from '../../service/floor.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  // @ViewChild('createFloorModal') createFloorModal!: ElementRef;

  public floor!: Floor;
  public user!: User;
  public admin!: boolean;

  constructor(
    private storageService: StorageService, 
    private floorService: FloorService, 
    private userService: UserService,
    private router: Router
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
    this.userService.getCurrentUser().subscribe(
      (response: User) => {
        this.user = response;
      },
      error => {
        console.error('Error getting current user:', error);
        this.admin = false;
      }
    );
  }

  public onCreateFloor(
    createFloorForm: NgForm, 
    svgInput: HTMLInputElement, 
    photosInput: HTMLInputElement): void {

    const floor = createFloorForm.value;
  
    this.floorService.create(floor, svgInput.files?.[0] as File, photosInput.files as FileList).subscribe(
        (response: Floor) => {
            console.log('Floor created successfully', response);
            this.floor = response;

            // this.floorService.findAll();

            window.location.reload();

            // if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            //   const modalElement = this.createFloorModal.nativeElement;
            //   const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
            //   modal.hide();
            // }
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    );
  }

  public onLogout() : void {
    console.log('entry point onLogout')

    this.storageService.removeJwtToken();
    this.router.navigate(['/login']);

    console.log('Successfully logged out')
  }

}
