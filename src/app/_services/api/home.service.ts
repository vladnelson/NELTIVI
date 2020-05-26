import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private Url: string;
  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:1836/api/Home';
  }

  Search(WordSearch: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post<ShowVm>(this.Url + '/SearchFilmOrShow', WordSearch, httpOptions);
  }
}
