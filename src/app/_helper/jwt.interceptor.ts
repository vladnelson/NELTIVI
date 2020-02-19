import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../_services/api/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private autehnticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.autehnticationService.currrentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
               setHeaders: {
                   Authorization: `Bearer ${currentUser.token}`
               }
            });
        }

        return next.handle(request);
    }
}
