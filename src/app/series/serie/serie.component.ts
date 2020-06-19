import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShowService } from 'src/app/_services/api/show.service';
import { FilmOrShow } from 'src/app/_models/film-or-show';
import { Creator } from 'src/app/_models/creator';
import { Platform } from 'src/app/_models/platform';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit, AfterViewInit {
  @ViewChild('headerSerieDescription') headerDiv: ElementRef;
  private sub: Subscription;
  private serieId: number;
  url_images_Pref_Shows = 'http://localhost:1836/Content/Images/Shows';
  showCurrent: FilmOrShow;

  director = 'Inconnu';
  coDirector = 'Inconnu';
  networks = 'Inconnu';
  origins = 'Inconnu';
  genres = 'Inconnu';

  urlImagesBack = this.url_images_Pref_Shows + '/gpJZiTvklr5JN0mzpQwl99peQD7.jpg';
  urlImagesFront = this.url_images_Pref_Shows + '/gpJZiTvklr5JN0mzpQwl99peQD7.jpg';

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngAfterViewInit(): void {
    console.log(this.headerDiv.nativeElement.innerHTML);
  }

  ngOnInit() {



    this.sub = this.route.params.subscribe(params => {
      this.serieId = params['serieId'];

      this.showService.GetShow(this.serieId)
        .subscribe((Response) => {
          console.log(Response);
          this.showCurrent = Response;
          Response.backdrop_path = this.url_images_Pref_Shows + Response.backdrop_path;
          Response.poster_path = this.url_images_Pref_Shows + Response.poster_path;
          this.headerDiv.nativeElement.style.background = ' url("' + Response.backdrop_path + '") no-repeat  40%/100%';
          this.headerDiv.nativeElement.style.minHeight = '40vh';

          this.LoadShowInView(this.showCurrent);

          console.log(Response);
        },
          (error) => console.log(error));
    });
  }

  LoadShowInView(Show: FilmOrShow) {

    // director = 'Inconnu';
    // coDirector = 'Inconnu';
    // networks = 'Inconnu';
    // origins = 'Inconnu';
    // genres = 'Inconnu';
    let counter = 0;
    this.genres = '';
    Show.genres.forEach(genre => {
      counter++;
      if (counter !== Show.networks.length) {
        this.genres = this.genres + genre.name + ', ';
      } else {
        this.genres = this.genres + genre.name;
      }
    });

    counter = 0;
    this.origins = '';
    Show.origin_country.forEach(country => {
      if (counter !== Show.networks.length) {
        this.origins = this.origins + country + ', ';
      } else {
        this.origins = this.origins + country;
      }
    });

    counter = 0;
    this.networks = '';
    Show.networks.forEach(platforme => {
      if (counter !== Show.networks.length) {
        this.networks = this.networks + platforme.name + ', ';
      } else {
        this.networks = this.networks + platforme.name;
      }
    });

    counter = 0;

    Show.created_by.forEach(creator => {
      if (counter === 0) {
        this.director = '';
        this.director = this.director + creator.name;
      } else if (counter === 1) {
        this.coDirector = '';
        this.coDirector = this.coDirector + creator.name;
      }
    });

  }

}
