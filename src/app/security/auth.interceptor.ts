import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

import { LoginService } from 'app/security/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor( private injector: Injector) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService);

        if (loginService.isLoggedIn()) {
            const authRequest = req.clone( 
                { setHeaders: { 'Authorization' : `Bearer ${ loginService.user.accessToken }` } } );
            return next.handle( authRequest );
        } else {
            return next.handle(req);
        }
    }

}