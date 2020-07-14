import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilmVm } from 'src/app/_viewmodels';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private Url: string;
  constructor(private http: HttpClient) {
    this.Url = 'http://digitteamlog-001-site3.ctempurl.com/api/Film';
    //this.Url = 'http://localhost:1836/api/Film';
  }


  GetTopFilm() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<FilmVm>(this.Url + '/TopFilm', reqHeader);
  }

  GetTopFilmWeek() {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<FilmVm>(this.Url + '/TopFilm', reqHeader);

  }

  GetTopFilmById(Id: number) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<FilmVm>(this.Url + '/TopFilm', reqHeader);

  }

  GetLastVideosFilm() {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<FilmVm>(this.Url + '/TopFilm', reqHeader);

  }
}
