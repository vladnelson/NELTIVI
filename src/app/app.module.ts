import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { appRoutingModule } from './app.routing';
import { ConnectionRegisterComponent } from './connection/connection-register/connection-register.component';
import { ConnectionLoginComponent } from './connection/connection-login/connection-login.component';
import { NgbModule, NgbSlide, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { HomeSerieComponent } from './series/home-serie/home-serie.component';
import { SerieComponent } from './series/serie/serie.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeFilmsComponent } from './films/home-films/home-films.component';
import { FilmComponent } from './films/film/film.component';
import { ProfilComponent } from './profil/profil.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    HomeComponent,
    ConnectionRegisterComponent,
    ConnectionLoginComponent,
    HomeSerieComponent,
    SerieComponent,
    NotFoundComponent,
    HomeFilmsComponent,
    FilmComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
