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

  email: string = '';
  password: string = '';

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

  public login(): void {
    this.userService.login(this.email, this.password).subscribe(
      data => {
        this.userService.saveToken(data.token);
        console.log('User signed in successfully');
        this.router.navigate(['/floors']);
      },
      error => {
        console.log('Login failed', error);
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

  // public onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log('Form Submitted', this.registerForm.value);
  //     // Here you can send the form data to the backend
  //   }
  // }

  public onOpenModal(user: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'register') {
      button.setAttribute('data-target', '#registrationModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onRegister(addForm: NgForm) : void {
    console.log('entry point onRegister')

    this.userService.register(addForm.value).subscribe(
      response => {
        console.log('User registered successfully', response);
        // token saving
        this.storageService.setItem('jwtToken', response.token)
        this.router.navigate(['/login']);

        // $('#myModal').modal('hide')

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}
