import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShowService } from 'src/app/_services/api/show.service';
import { FilmOrShow } from 'src/app/_models/film-or-show';
import { Creator } from 'src/app/_models/creator';
import { Platform } from 'src/app/_models/platform';
import { DemoVisual } from 'src/app/_models/demoVisual';
import { Svod } from 'src/app/_models/svod';
import { Users } from 'src/app/_models';
import { AuthenticationService } from 'src/app/_services/api/authentication.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit, AfterViewInit {
  @ViewChild('headerSerieDescription') headerDiv: ElementRef;
  @ViewChild('frameDemonstrationShow') frameDemonstrationShow: ElementRef;
  private sub: Subscription;
  private serieId: number;
  private serieIdTM: string;
  _currentUserAllRoles: Users;
  url_images_Pref_Shows = 'http://localhost:1836/Content/Images/Shows';
  showCurrent = new FilmOrShow();

  plateformVideos: Array<Svod>;
  genres = 'Inconnu';

  urlImagesBack = this.url_images_Pref_Shows + '/gpJZiTvklr5JN0mzpQwl99peQD7.jpg';
  urlImagesFront = this.url_images_Pref_Shows + '/gpJZiTvklr5JN0mzpQwl99peQD7.jpg';
  urlvideosDemonstrationShow = "https://videos.cineserie.com/player/index/112129/3/21";

  constructor(
    private showService: ShowService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,) {
      this.authenticationService.currentUser.subscribe(x => this._currentUserAllRoles = x);
  }

  ngAfterViewInit(): void {
    this.plateformVideos = new Array<Svod>();
    console.log(this.headerDiv.nativeElement.innerHTML);
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.serieId = params['serieId'];
      this.serieIdTM = params['serieIdTM'];


      this.showService.GetShow(this.serieId, this.serieIdTM)
        .subscribe((Response) => {
          console.log(Response);
          this.showCurrent = Response.shows[0];
          console.log(this.showCurrent);
          this.showCurrent.backdrop_path = this.showCurrent.images.banner;
          this.showCurrent.poster_path = this.showCurrent.images.poster;
          this.headerDiv.nativeElement.style.background = ' url("' + this.showCurrent.images.banner + '") no-repeat  40%/100%';
          this.headerDiv.nativeElement.style.minHeight = '50vh';
          if (this.showCurrent.VisualDemos != null) {
            if (this.showCurrent.VisualDemos.length > 0) {
              let visualDemos = this.showCurrent.VisualDemos;
              for (let index = 0; index < visualDemos.length; index++) {
                const element = visualDemos[index];
                this.GetVideosDemontration(element);
              }
            }
          }
          this.plateformVideos = new Array<Svod>();

          if (this.showCurrent.platforms != null) {
            if (this.showCurrent.platforms.svods != null) {
              for (let index = 0; index < this.showCurrent.platforms.svods.length; index++) {
                const element = this.showCurrent.platforms.svods[index];
                this.plateformVideos.push(element);
              }

            } else if (this.showCurrent.platforms.svod != null) {

              this.plateformVideos.push(this.showCurrent.platforms.svod);
            }
          }

        },
          (error) => console.log(error));
    });
  }

  GoPlateform(event: Event) {
    const divShow = (event.target as HTMLInputElement);
    const link = divShow.dataset.link;
    console.log(event.target);
    if (link != null || link != undefined) {
      window.open(link, "_blank");
    }
  }

  GetVideosDemontration(element: DemoVisual) {
    if (element.title == this.showCurrent.title) {
      if (element.videos != null) {
        let bandeAnnonce = element.videos["Bande Annonce"];
        let Teaser = element.videos["Teaser"];
        let Extrai = element.videos["Extrai"];

        this.frameDemonstrationShow.nativeElement.src="";
        //==============================================================================
        // Sélection de la vidéo de démonstration à montrer.
        //==============================================================================

        if (Teaser != null) {
          if (Teaser["en"] != null && Teaser["fr"] == null) {
            this.frameDemonstrationShow.nativeElement.src = Teaser["en"][0];
            this.frameDemonstrationShow.nativeElement.style.display = "";
          } else if (Teaser["fr"] != null) {
            this.frameDemonstrationShow.nativeElement.src = Teaser["fr"][0];
            this.frameDemonstrationShow.nativeElement.style.display = "";
          }
        }

        if (Extrai != null) {
          if (Extrai["en"] != null && Extrai["fr"] == null) {
            this.frameDemonstrationShow.nativeElement.src = Extrai["en"][0];
            this.frameDemonstrationShow.nativeElement.style.display = "";
          } else if (Extrai["fr"] != null) {
            this.frameDemonstrationShow.nativeElement.src = Extrai["fr"][0];
            this.frameDemonstrationShow.nativeElement.style.display = "";
          }
        }

        if (bandeAnnonce != null) {
          if (bandeAnnonce["en"] != null && bandeAnnonce["fr"] == null) {
            this.frameDemonstrationShow.nativeElement.src = bandeAnnonce["en"][0];
            this.frameDemonstrationShow.nativeElement.style.display = "";
          } else if (bandeAnnonce["fr"] != null) {
            this.frameDemonstrationShow.nativeElement.src = bandeAnnonce["fr"][0];
            this.frameDemonstrationShow.nativeElement.style.display = "";
          }
        }


      }
    }
  }

}
