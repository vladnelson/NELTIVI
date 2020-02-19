import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/api/authentication.service';
import { first } from 'rxjs/operators';
import { error } from 'protractor';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  loginForm: FormGroup;
  registerForm:  FormGroup;
  loadingLogin = false;
  loadingRegister = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      if (this.authenticationService.currrentUserValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get fL() { return this.loginForm.controls; }
  get fR() { return this.registerForm.controls; }

  onSubmitLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loadingLogin = true;
    // this.authenticationService.login(this.fL.username.value, this.fL.password.value)
    //     .pipe(first())
    //     .subscribe(
    //       (data: string) => {
    //         this.router.navigate([this.returnUrl]);
    //       },
    //       (error: string) => {
    //         this.error = error;
    //         this.loadingLogin = false;
    //       }
    //     );
  }

}
