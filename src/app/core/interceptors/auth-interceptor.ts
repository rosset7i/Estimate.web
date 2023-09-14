import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private authenticationService: AuthenticationService) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isValid = this.authenticationService.isUserLoggedIn();
    const containsAuthApi = req.url.includes('authentication');

    if (!isValid && !containsAuthApi) {
      this.authenticationService.refreshToken();
    }

    const token = this.authenticationService.getToken();

    let request = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request);
  }
}
