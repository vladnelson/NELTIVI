import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/api/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-connection-register',
  templateUrl: './connection-register.component.html',
  styleUrls: ['./connection-register.component.css']
})
export class ConnectionRegisterComponent implements OnInit {
  @Input() formBuilder: FormBuilder;
  @Input() authenticationService: AuthenticationService;
  @Input() router: Router;
  @Input() returnUrl: string;
  error: string;
  registerForm: FormGroup;
  loadingRegister = false;
  submitted = false;
  constructor() { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  get fR() { return this.registerForm.controls; }



  onSubmitRegister() {
    console.log('onSubmitLogin');
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loadingRegister = false;
    this.authenticationService.register(this.fR.username.value,
      this.fR.email.value,
      this.fR.password.value,
      this.fR.confirmPassword.value)
      .pipe(first())
      .subscribe(
        () => {
          console.log('succes');

        }
      );
  }
}
