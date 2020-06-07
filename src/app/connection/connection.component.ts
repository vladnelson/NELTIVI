import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  returnUrl: string;
  error = '';
  constructor(
    public  formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currrentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

}
