import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilmAndShowVm } from 'src/app/_viewmodels';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private Url: string;
  constructor(private http: HttpClient) {
    this.Url = 'http://digitteamlog-001-site3.ctempurl.com/api/Home';
  }

  Search(WordSearch: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.get<FilmAndShowVm>(this.Url + '/SearchFilmOrShowT?query=' + WordSearch, httpOptions);
  }
}
