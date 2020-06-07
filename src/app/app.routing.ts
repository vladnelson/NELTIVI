import { Routes, RouterModule } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_helper/auth.guard';
import { HomeSerieComponent } from './series/home-serie/home-serie.component';
import { HomeFilmsComponent } from './films/home-films/home-films.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    // Demande de page de connection ou d'inscription
    { path: 'connect', component: ConnectionComponent },
    // Toujours rediriger vers l'accueil lorsque le permalien attendu est inconnu.

    { path: 'series', component: HomeSerieComponent },
    { path: 'films', component: HomeFilmsComponent },

    { path: '**', component: NotFoundComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
