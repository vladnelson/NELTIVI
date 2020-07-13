import { Component, ViewChild } from '@angular/core';
import { Users, Show, ImagesShow } from './_models';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/api/authentication.service';
import { HomeService } from './_services/api/home.service';
import { FilmOrShow } from './_models/film-or-show';
import { FORMERR } from 'dns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('BodySearch') blockSearch;
  _currentUserAllRoles: Users;
  title = 'neltivi';
  url_images_Pref_Shows = 'http://localhost:1836/Content/Images/Shows';
  url_images_Pref_Movies = 'http://localhost:1836/Content/Images/Movies';
  public SerieQuery: Array<FilmOrShow>;
  public MoviesQuery: Array<FilmOrShow>;
  isNavbarCollapsed = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private homeService: HomeService) {
    this.authenticationService.currentUser.subscribe(x => this._currentUserAllRoles = x);
    console.log(this._currentUserAllRoles);

  }

  Search(event: Event) {

    const query = (event.target as HTMLInputElement).value;
    if (query !== '') {
      this.blockSearch.nativeElement.style.display = 'block';
      this.homeService.Search(query).subscribe(
        (Response) => {
          const tempsArraySerie = new Array<FilmOrShow>();
          const tempsArrayMovies = new Array<FilmOrShow>();

          const valueInputSearchBefore = (event.target as HTMLInputElement).value;
          if (valueInputSearchBefore === Response.query) {
            this.SerieQuery = new Array<FilmOrShow>();
            this.MoviesQuery = new Array<FilmOrShow>();

            for (let index = 0; index < Response.Shows.length; index++) {
              const element = Response.Shows[index];

              this.SerieQuery[index] = element;

              tempsArraySerie.push(element);

            }

            for (let index = 0; index < Response.Movies.length; index++) {
              const element = Response.Movies[index];

              this.MoviesQuery[index] = element;

              tempsArrayMovies.push(element);

            }
          }


          const valueInputSearch = (event.target as HTMLInputElement).value;

          if (tempsArraySerie.length > 0) {
            this.SerieQuery = new Array<FilmOrShow>();
            if (valueInputSearch === Response.query) {
              for (let index = 0; index < tempsArraySerie.length; index++) {
                if (tempsArraySerie[index].poster_path == null) {
                  tempsArraySerie[index].poster_path = '';
                } else {
                  tempsArraySerie[index].poster_path = this.url_images_Pref_Shows + tempsArraySerie[index].poster_path;
                }
                this.SerieQuery[index] = tempsArraySerie[index];
              }
            }
          }

          if (tempsArrayMovies.length > 0) {
            this.MoviesQuery = new Array<FilmOrShow>();
            if (valueInputSearch === Response.query) {
              for (let index = 0; index < tempsArrayMovies.length; index++) {
                if (tempsArrayMovies[index].poster_path == null) {
                  tempsArrayMovies[index].poster_path = '';
                } else {
                  tempsArrayMovies[index].poster_path = this.url_images_Pref_Movies + tempsArrayMovies[index].poster_path;
                }
                this.MoviesQuery[index] = tempsArrayMovies[index];
              }
            }
          }
        },
        (error) => console.log(error)
      );
    } else {
      this.SerieQuery = null;
      this.MoviesQuery = null;
      this.blockSearch.nativeElement.style.display = 'none';
    }
  }

  logout($event) {
  
    this.authenticationService.logout();
    this.router.navigate(['/connect']);
  }
}
