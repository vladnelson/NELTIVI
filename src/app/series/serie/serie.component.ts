import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShowService } from 'src/app/_services/api/show.service';
import { FilmOrShow } from 'src/app/_models/film-or-show';
import { Creator } from 'src/app/_models/creator';
import { Platform } from 'src/app/_models/platform';
import { DemoVisual } from 'src/app/_models/demoVisual';
import { AuthenticationService } from 'src/app/_services/api/authentication.service';
import { Users } from 'src/app/_models';

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
  _currentUserAllRoles: Users;
  url_images_Pref_Shows = 'http://digitteamlog-001-site3.ctempurl.com/Content/Images/Shows';
  showCurrent = new FilmOrShow();


  genres = 'Inconnu';

  urlImagesBack = this.url_images_Pref_Shows + '/gpJZiTvklr5JN0mzpQwl99peQD7.jpg';
  urlImagesFront = this.url_images_Pref_Shows + '/gpJZiTvklr5JN0mzpQwl99peQD7.jpg';
  urlvideosDemonstrationShow = "https://videos.cineserie.com/player/index/112129/3/21";
  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this._currentUserAllRoles = x);
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

        },
          (error) => console.log(error));
    });
  }

  GetVideosDemontration(element: DemoVisual) {
    if (element.title == this.showCurrent.title) {
      if (element.videos != null) {
        let bandeAnnonce = element.videos["Bande Annonce"];
        let Teaser = element.videos["Teaser"];
        let Extrai = element.videos["Extrai"];

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

        this.frameDemonstrationShow.nativeElement.contentWindow.speaker[0].muted = false;
      }
    }
  }

}
