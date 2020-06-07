import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ShowService } from 'src/app/_services/api/show.service';
import { Film } from 'src/app/_models/film';
import { FilmService } from 'src/app/_services/api/film.service';

@Component({
  selector: 'app-home-films',
  templateUrl: './home-films.component.html',
  styleUrls: ['./home-films.component.css']
})
export class HomeFilmsComponent implements OnInit {
  private isLoadingFilmTop = true;
  private isLoadingFilmTopWeek = true;

  public filmTop: Array<Film>;
  public filmTopWeek: Array<Film>;

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://pictures.betaseries.com/fonds/show/1161_1521643782.jpg`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel') carousel: NgbCarousel;
  constructor(private filmService: FilmService,
  ) {
    this.LoadingFilm();
  }

  ngOnInit() {
    this.filmService.GetTopFilm().subscribe(
      (Response) => {
        this.isLoadingFilmTop = false;
        this.filmTop = Response.films;
        console.log(this.filmTop[0]);
      },
      (error) => console.log(error)
    );

    this.filmService.GetTopFilmWeek().subscribe(
      (Response) => {
        this.isLoadingFilmTop = false;
        this.filmTopWeek = Response.films;
        console.log(this.filmTop[0]);
      },
      (error) => console.log(error)
    );
  }

  /**
   * Method for print a loading of tops.
   */
  LoadingFilm() {
    this.isLoadingFilmTop = true;
    this.isLoadingFilmTopWeek = true;
    this.filmTop = new Array<Film>();
    this.filmTopWeek = new Array<Film>();
    for (let index = 0; index < 20; index++) {
      const itemShow = new Film();
      itemShow.poster = '../../assets/Images/Loading/Eclipse-1s-200px Loading.gif';
      this.filmTop.push(itemShow);
      this.filmTopWeek.push(itemShow);
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

}
