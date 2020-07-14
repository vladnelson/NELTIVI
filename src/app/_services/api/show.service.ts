import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShowVm } from 'src/app/_viewmodels/show-vm';
import { FilmOrShow } from 'src/app/_models/film-or-show';


@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private Url: string;

  constructor(private http: HttpClient) {
    //this.Url = 'http://digitteamlog-001-site3.ctempurl.com/api/Show';
    this.Url = 'http://localhost:1836/api/Show';
  }

  GetTopShow() {
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<ShowVm>(this.Url + '/TopShow', reqHeader);
  }

  SaveFoolowShow(ShowId: number) {
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("envoie requette " + ShowId);
    return this.http.post(this.Url + `/ShowFollow?ShowId=${ShowId}`, reqHeader);
  }

  GetTopShowWeek() {


    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<ShowVm>(this.Url + '/TopShow', reqHeader);

  }

  GetShow(Id: number, IdTM: string) {

    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (Id != 0) {
      return this.http.get<ShowVm>(this.Url + `/Show?ShowId=${Id}&ShowNameTM=${IdTM}`, reqHeader);
    } else {
      return this.http.get<ShowVm>(this.Url + `/Show?ShowId=${Id}&ShowNameTM=${IdTM}`, reqHeader);
    }

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
