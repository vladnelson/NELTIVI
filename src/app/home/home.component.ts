import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowService } from '../_services/api/show.service';
import { Show, ImagesShow } from '../_models';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isLoadingShowTop = true;
  private isLoadingShowTopWeek = true;

  private showTop: Array<Show>;
  private showTopWeek: Array<Show>;

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://pictures.betaseries.com/fonds/show/1161_1521643782.jpg`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel') carousel: NgbCarousel;

  constructor(private showService: ShowService,
  ) {
    this.LoadingInworkShow();
  }

  ngOnInit() {
    this.showService.GetTopShow().subscribe(
      (Response) => {
        this.isLoadingShowTop = false;
        this.showTop = Response.shows;
        console.log(this.showTop[0]);
      },
      (error) => console.log(error)
    );

    this.showService.GetTopShowWeek().subscribe(
      (Response) => {
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
    this.showTop = new Array<Show>();
    this.showTopWeek = new Array<Show>();
    for (let index = 0; index < 20; index++) {
      const itemShow = new Show();
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

}
