import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { AutenticacaoService } from 'src/app/services/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private autenticacaoService: AutenticacaoService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
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
