import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Users } from 'src/app/_models';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private CURRENT_USER = 'currentUser';
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;

  constructor(private http: HttpClient) {
    this.currentUserSubject =  new BehaviorSubject<Users>(JSON.parse(localStorage.getItem(this.CURRENT_USER)));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currrentUserValue(): Users {
    return this.currentUserSubject.value;
   }

   /**
    * Méthode pour l'authentification d'un utilisateur
    * @param email
    * @param password
    */
   login(email: string, password: string) {
     return null;
   }

   /**
    * Methode pour la déconnection d'un utilisateur connecter
    */
   logout() {
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUserSubject.next(null);
   }

   register(username: string, email: string, password: string, ConfirmPassword: string) {
      return this.login(email, password);
   }
}
