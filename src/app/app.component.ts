import { Component } from '@angular/core';
import { Users } from './_models';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/api/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _currentUserAllRoles: Users;
  title = 'neltivi';

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this._currentUserAllRoles = x);
  }


  logout($event) {
    console.log('Se deconnecter');
    this.authenticationService.logout();
    this.router.navigate(['/connect']);
  }
}
