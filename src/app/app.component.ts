import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Role, User } from './model/user';
import { UserService } from './service/user.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { TestService } from './service/test.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'test-project';

  public user: User | undefined;
  public users: User[] | undefined;
  public testData: any;

  constructor(private userService: UserService, private testService: TestService) {}

  ngOnInit(): void {
    this.user = { id: 1, username: 'johnDoe', password: 'passw0rd', email: 'john@example.com', role: Role.Admin};
    this.registerUser(this.user);
    this.findUsers();

    this.testService.fetchData().subscribe(
      (response) => {
        this.testData = response;
      }
    )
  }

  public getUserById(id: number): void {
    this.userService.getUserById(id).subscribe( 
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );
  }

  public findUsers(): void {
    this.userService.findAll().subscribe( 
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );
  }

  public registerUser(user: User): void {
    this.userService.registerUser(user).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public updateUser(id: number, user: User): void {
    this.userService.updateUser(id, user).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteUserById(id: number): void {
    this.userService.deleteUserById(id).subscribe(
      (response) => {
        console.log('User deleted successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
