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
        this.setToken(token.token);
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
    return localStorage.getItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }

  private getDecodedToken(): any {
    const token = this.getToken();

    if (!token) return null;

    return jwtDecode(token);
  }

  private getTokenExpirationDate(): Date {
    const token = this.getDecodedToken();

    if (!token || token.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  private getTokenEmail(): string {
    const token = this.getDecodedToken();

    if (!token || token.email === undefined) return null;

    return token.email;
  }

  private isTokenExpired(): boolean {
    const date = this.getTokenExpirationDate();

    if (!date) return false;

    return date.valueOf() < Date.now();
  }

  public isUserLoggedIn() {
    const token = this.getToken();

    if (!token || this.isTokenExpired()) return false;

    return true;
  }
}
