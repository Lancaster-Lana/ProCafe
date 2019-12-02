import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { User } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordFormGroup: FormGroup;
  loading = false;
  submitted = false;
  errors: string; //registration errors

  constructor(private router: Router,
    private formBuilder: FormBuilder, private alertService: AlertService,
    private authService: AuthenticationService)
  {
    // redirect to home if already logged in
    if (this.authService.authenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required], // Validators.minLength(6)],
      confirmPassword: ['', Validators.required]}, {
        validator: RegistrationValidator.validate.bind(this)
      });

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.email],
      passwordFormGroup: this.passwordFormGroup
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    //retrieve necessary user data from formGroups
    var user: User = this.registerForm.value;
    user.password = this.passwordFormGroup.value.password;
    user.confirmPassword = this.passwordFormGroup.value.confirmPassword;

    this.authService.register(user)
      .pipe(first())
      .subscribe(
        result => {
          if (result && result.error) {
            console.log(result.error.Error);
            this.errors = result.error.Error;//.json();
          }
          else {
            this.router.navigate(['/login']);  //this.alertService.success('Registration successful', true);
          }
        },
        error => {
          // error from server //this.alertService.error(error);
          this.loading = false;
          
          this.errors = error;
        });
  }
}

export class RegistrationValidator
{
  static validate(registrationFormGroup: FormGroup) {
    let password = registrationFormGroup.controls.password.value;
    let confirmPassword = registrationFormGroup.controls.confirmPassword.value;

    if (confirmPassword.length <= 0) {
      return null;
    }

    if (confirmPassword !== password) {
      return {
        doesMatchPassword: true
      };
    }
    return null;
  }
}
