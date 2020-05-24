import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShowVm } from 'src/app/_viewmodels/show-vm';


@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:1836/api/Show';
  }

  GetTopShow() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<ShowVm>(this.Url + '/', reqHeader);
  }

  GetTopShowWeek() {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<ShowVm>(this.Url + '/', reqHeader);

  }

  GetTShow(Id: number) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<ShowVm>(this.Url + '/', reqHeader);

  }

  GetLastVideosShow() {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<ShowVm>(this.Url + '/', reqHeader);

  }


}
