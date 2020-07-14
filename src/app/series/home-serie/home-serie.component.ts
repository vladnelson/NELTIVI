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

  url_images_Pref_Shows = 'http://digitteamlog-001-site3.ctempurl.com/Content/Images/Shows';

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

          shows[index].poster_path = shows[index].images.poster;
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

          shows[index].poster_path = shows[index].images.poster;
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
      itemShow.poster_path = '../../assets/Images/Loading/Eclipse-1s-200px Loading.gif';
      this.showTop.push(itemShow);
      const itemShowWeek = new FilmOrShow();
      itemShowWeek.poster_path = '../../assets/Images/Loading/Eclipse-1s-200px Loading.gif';
      this.showTopWeek.push(itemShowWeek);
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
    const id = divShow.dataset.idshow;
    if (id != null || id != undefined) {
      this.router.navigate([`./serie/${id}`]);
    }
  }

  /**
   * Visualisation des détails d'une série.
   * @param event l'element ou l'évenement s'est produit.
   */
  ShowsDetail(event: Event) {
    const divShow = event.target as HTMLInputElement;
    let imageShow = divShow.children[0] as HTMLInputElement;
    let detailShow = divShow.children[1] as HTMLInputElement;
    const id = divShow.dataset.idshow;

    console.log(id);
    console.log(divShow);
    console.log(divShow.dataset);
    if (id != null || id != undefined) {
      divShow.style.minWidth = '600px';
      divShow.style.width = '600px';

      divShow.classList.remove("col-1");
      divShow.classList.add("col-3");
      imageShow.classList.remove("col-md-12");
      imageShow.classList.add("col-md-3");
      detailShow.style.display = "";
    }
  }

  /**
   * Restauration des valeurs par défaut pour l'affichage des séries.
   * @param event l'element ou l'évenement s'est produit.
   */
  ShowsDetailLeave(event: Event) {
    const divShow = event.target as HTMLInputElement;
    let imageShow = divShow.children[0] as HTMLInputElement;
    let detailShow = divShow.children[1] as HTMLInputElement;
    
    const id = divShow.dataset.idshow;

    if (id != null || id != undefined) {
      divShow.style.minWidth = '';
      divShow.style.width = '';

      divShow.classList.remove("col-3");
      divShow.classList.add("col-1");
      imageShow.classList.remove("col-md-3");
      imageShow.classList.add("col-md-12");
      detailShow.style.display = "none";
    }
  }

}
