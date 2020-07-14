import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/api/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-connection-login',
  templateUrl: './connection-login.component.html',
  styleUrls: ['./connection-login.component.css']
})
export class ConnectionLoginComponent implements OnInit {
  @Input() formBuilder: FormBuilder;
  @Input() authenticationService: AuthenticationService;
  @Input() router: Router;
  @Input() returnUrl: string;
  error: string;
  constructor(private toast: ToastrService) { }
  loginForm: FormGroup;
  loadingLogin = false;
  submitted = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailLogin: ['', Validators.required, Validators.email],
      passwordLogin: ['', Validators.required]
    });

  }
  get fL() { return this.loginForm.controls; }
  onSubmitLogin() {
    console.log('onSubmitLogin');
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loadingLogin = true;
    this.authenticationService.login(this.fL.emailLogin.value, this.fL.passwordLogin.value)
      .pipe(first())
      .subscribe(
        (data: string) => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        (error: string) => {
          this.error = error;
          this.loadingLogin = false;
          this.toast.error("Votre tentative de connection n'a pas aboutit, Rééssayer","Authentification échoué !")
        }
      );
  }
}
