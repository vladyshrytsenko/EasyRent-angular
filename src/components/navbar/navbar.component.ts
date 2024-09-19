import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // private currentUser!: User;

  constructor(
    private storageService: StorageService, 
    private userService: UserService, 
    private router: Router
  ) {}

  public onLogout() : void {
    console.log('entry point onLogout')

    this.storageService.removeJwtToken();
    this.router.navigate(['/login']);

    console.log('Successfully logged out')
  }

  // public isAdmin(): boolean {
  //   const token = this.storageService.getJwtToken()!;

  //   if (token != null) {
  //     const payload = this.decodeToken(token);
  //     if (payload || payload.sub) {
  
  //       this.userService.getByUsername(payload.sub).subscribe( 
  //         (response: User) => {
  //           this.currentUser = response;
  //         }
  //       );
  
  //       if (this.currentUser.role === 'ADMIN') {
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
  // }

  // private decodeToken(token: string): any {
  //   try {
  //     const payload = token.split('.')[1];
  //     return JSON.parse(atob(payload));
  //   } catch (e) {
  //     console.error('Error decoding token', e);
  //     return null;
  //   }
  // }

}
