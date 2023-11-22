import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Api } from 'api';
import { LoginRequest } from '../components/autenticacao/models/login-request';
import { LoginResponse } from '../components/autenticacao/models/login-response';
import { RegisterRequest } from '../components/autenticacao/models/registrar-request';
import jwtDecode from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RefreshModalComponent } from '../core/components/refresh-modal/refresh-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngbModal: NgbModal
  ) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${Api.ESTIMATE_API}/authentication/login`,
      loginRequest
    );
  }

  public register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(
      `${Api.ESTIMATE_API}/authentication/register`,
      registerRequest
    );
  }

  public logout() {
    this.removeToken();
    this.router.navigate(['/authentication/login']);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }

  public refreshToken() {
    const modalRef = this.ngbModal.open(RefreshModalComponent);
    modalRef.componentInstance.email = this.getTokenEmail();
    this.removeToken();
    modalRef.result.then(
      (e) => this.handleRefreshSuccess(e),
      () => this.router.navigate(['/authentication/login'])
    );
  }

  private handleRefreshSuccess(result: any) {
    this.login(result).subscribe(
      (response) => this.setToken(response.token),
      () => this.router.navigate(['/authentication/login'])
    );
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

  public getTokenEmail(): string {
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
