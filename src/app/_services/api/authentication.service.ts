import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Users } from 'src/app/_models';
import { map } from 'rxjs/operators';
import { RegisterVm } from 'src/app/_viewmodels/register-vm';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private CURRENT_USER = 'currentUser';
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;
  private Url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem(this.CURRENT_USER)));
    this.currentUser = this.currentUserSubject.asObservable();
    this.Url = 'http://digitteamlog-001-site3.ctempurl.com/';
    //this.Url = 'http://localhost:1836/';

    let currentuser: any = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentuser);

    let userConnected = new Users();
    if (currentuser) {
      userConnected.email = currentuser.userName;
      userConnected.token = currentuser.access_token;
      this.currentUserSubject.next(userConnected);
    }
  }

  public get currrentUserValue(): Users {
    return this.currentUserSubject.value;
  }

  /**
   * Méthod for login user.
   * @param email
   * @param password
   */
  login(email: string, password: string) {

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    });


    const userData = 'username=' + email + '&password=' + password + '&grant_type=password';
    return this.http.post<any>(this.Url + `token`, userData, { headers: reqHeader })
      .pipe(map(user => {
        console.log(user);
        // sauvegarde du token  et connection de l'utilisateur.
        localStorage.setItem('currentUser', JSON.stringify(user));
        let userConnected = new Users();

        userConnected.email = user.userName;
        userConnected.token = user.access_token;

        this.currentUserSubject.next(userConnected);
        return user;
      }));
  }

  /**
   * Methode for disconnect user connected.
   */
  logout() {
    this.http.post(this.Url + 'api/Account/Logout', '');
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUserSubject.next(null);
  }

  /**
   * Method for register a visitor.
   * @param username 
   * @param email 
   * @param password 
   * @param ConfirmPassword 
   */
  register(username: string, email: string, password: string, ConfirmPassword: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const userDataRegister = new RegisterVm();

    userDataRegister.Username = username;
    userDataRegister.Email = email;
    userDataRegister.Password = password;
    userDataRegister.ConfirmPassword = password;
    return this.http.post<RegisterVm[]>(this.Url + 'api/Account/Register', userDataRegister, httpOptions);
  }
}
