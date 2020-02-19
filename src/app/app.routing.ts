import { Routes, RouterModule } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helper/auth.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    // Demande de page de connection ou d'inscription
    {path: 'connect' , component: ConnectionComponent},
    // Toujours rediriger vers l'accueil lorsque le permalien attendu est inconnu.
    {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
