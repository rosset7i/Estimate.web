import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private autenticacaoService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isValid = this.autenticacaoService.isUserLoggedIn();
    const containsAuthApi = req.url.includes('autenticacao');

    if (!isValid && !containsAuthApi) {
      this.autenticacaoService.refreshToken();
    }

    const token = this.autenticacaoService.getToken();

    let request = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request);
  }
}
