import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormsModule } from '@angular/forms';
import { Role, User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import bootstrap from '../../main.server';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  @ViewChild('registrationModal') registrationModal!: ElementRef;
  // registerForm!: FormGroup;

  user!: User;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private storageService: StorageService
  ) {}

  ngAfterViewInit(): void {
    // Ensure modal is initialized after view is initialized
    // Optionally, initialize the modal here if necessary
  }

  public onAuthenticate(loginForm: NgForm): void {
    console.log('entry point onAuthenticate')

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.userService.login(email, password).subscribe(
      data => {
        this.storageService.setItem('jwtToken', data.token);
        
        console.log('User signed in successfully. token: ', data.token);
        this.router.navigate(['/floors']);
      },
      error => {
        console.log('Login failed!', error.message);
      }
    );
  }

  public ngOnInit(): void {
    // this.registerForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', Validators.required]
    // });
  }

  public onRegister(registerForm: NgForm) : void {
    console.log('entry point onRegister')

    this.userService.register(registerForm.value).subscribe(
      response => {
        console.log('User registered successfully', response);
        // token saving
        // this.storageService.setItem('jwtToken', response.token)
        this.router.navigate(['/login']);

        // $('#myModal').modal('hide')

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
