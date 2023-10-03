import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Api } from 'api';
import { LoginRequest } from '../components/autenticacao/models/login-request';
import { LoginResponse } from '../components/autenticacao/models/login-response';
import { RegistrarRequest } from '../components/autenticacao/models/registrar-request';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  public login(loginRequest: LoginRequest) {
    return this.httpClient
      .post<LoginResponse>(
        `${Api.ORCAMENTO_API}/autenticacao/login`,
        loginRequest
      )
      .subscribe((token) => {
        window.localStorage.setItem('token', token.token);
        this.router.navigate(['/home']);
      });
  }

  public registrar(registrarRequest: RegistrarRequest): Observable<any> {
    return this.httpClient.post(
      `${Api.ORCAMENTO_API}/autenticacao/registrar`,
      registrarRequest
    );
  }

  public getToken(): string {
    return window.localStorage.getItem('token');
  }

  private getTokenExpirationDate(token: string): Date {
    const decodedJwt: any = jwtDecode(token);

    if (decodedJwt.exp == undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decodedJwt.exp);
    return date;
  }

  private isTokenExpired(token: string): boolean {
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date == undefined) return false;

    return date.valueOf() < Date.now().valueOf();
  }

  public isUserLoggedIn() {
    const token = this.getToken();

    if (!token || this.isTokenExpired(token)) return false;

    return true;
  }
}
