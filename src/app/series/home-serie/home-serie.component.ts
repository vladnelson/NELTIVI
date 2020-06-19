import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ShowService } from 'src/app/_services/api/show.service';
import { Show, ImagesShow } from 'src/app/_models';
import { Router } from '@angular/router';
import { FilmOrShow } from 'src/app/_models/film-or-show';

@Component({
  selector: 'app-home-serie',
  templateUrl: './home-serie.component.html',
  styleUrls: ['./home-serie.component.css']
})
export class HomeSerieComponent implements OnInit {
  private isLoadingShowTop = true;
  private isLoadingShowTopWeek = true;

  public showTop: Array<FilmOrShow>;
  public showTopWeek: Array<FilmOrShow>;

  url_images_Pref_Shows = 'http://localhost:1836/Content/Images/Shows';

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://pictures.betaseries.com/fonds/show/1161_1521643782.jpg`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel') carousel: NgbCarousel;
  constructor(
    private showService: ShowService,
    private router: Router
  ) {
    this.LoadingInworkShow();
  }

  ngOnInit() {
    this.showService.GetTopShow().subscribe(
      (Response) => {
        console.log(Response);
        const shows = Response.shows;
        for (let index = 0; index < shows.length; index++) {
          shows[index].poster_path = this.url_images_Pref_Shows + shows[index].poster_path;
        }
        this.isLoadingShowTop = false;
        this.showTop = Response.shows;
        console.log(this.showTop[0]);
      },
      (error) => console.log(error)
    );

    this.showService.GetTopShowWeek().subscribe(
      (Response) => {
        console.log(Response);
        const shows = Response.shows;
        for (let index = 0; index < shows.length; index++) {
          shows[index].poster_path = this.url_images_Pref_Shows + shows[index].poster_path;
        }
        this.isLoadingShowTopWeek = false;
        this.showTopWeek = Response.shows;
        console.log(this.showTop[0]);
      },
      (error) => console.log(error)
    );
  }

  /**
   * Method for print a loading of tops.
   */
  LoadingInworkShow() {
    this.isLoadingShowTop = true;
    this.isLoadingShowTopWeek = true;
    this.showTop = new Array<FilmOrShow>();
    this.showTopWeek = new Array<FilmOrShow>();
    for (let index = 0; index < 20; index++) {
      const itemShow = new FilmOrShow();
      (itemShow.images = new ImagesShow()).poster = '../../assets/Images/Loading/Eclipse-1s-200px Loading.gif';
      this.showTop.push(itemShow);
      this.showTopWeek.push(itemShow);
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

  onSlide() {
    // if (this.unpauseOnArrow && slideEvent.paused &&
    //  // (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
    //   this.togglePaused();
    // }
    // if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
    //   this.togglePaused();
    // }
  }

  DiscoverShow(event: Event) {
    const divShow = (event.target as HTMLInputElement).parentElement.parentElement;
    console.log(divShow.dataset);
    console.log(divShow.dataset.idshow);
    const id = divShow.dataset.idshow;
    //this.router.navigate([`./serie/${id}`]);
  }

  ShowsDetail(event: Event) {
    console.log('on blur enter');
    const divShow = event.target as HTMLInputElement;
    console.log(divShow.style.minWidth);
    console.log(divShow.style.width);
    divShow.style.minWidth = '500px';
    divShow.style.width = '500px';
  }

  ShowsDetailLeave(event: Event) {
    console.log('on blur');
    const divShow = event.target as HTMLInputElement;
    console.log(divShow.style.minWidth);
    console.log(divShow.style.width);
    divShow.style.minWidth = '';
    divShow.style.width = '';
  }

}
