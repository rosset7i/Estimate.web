import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Api } from 'api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RefreshModalComponent } from '../core/components/refresh-modal/refresh-modal.component';
import { LoginResponse } from '../components/authentication/models/login-response';
import { LoginRequest } from '../components/authentication/models/login-request';
import { RegisterRequest } from '../components/authentication/models/registrar-request';
import { jwtDecode } from 'jwt-decode';
import { ResultOf } from '../core/models/result-of';
import { JwtReturn } from '../core/models/jtw-return';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngbModal: NgbModal
  ) {}

  public login(request: LoginRequest): Observable<ResultOf<LoginResponse>> {
    return this.httpClient.post<ResultOf<LoginResponse>>(
      `${Api.ESTIMATE_API}/authentication/login`,
      request
    );
  }

  public register(request: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(
      `${Api.ESTIMATE_API}/authentication/register`,
      request
    );
  }

  public async logout(): Promise<void>{
    this.removeToken();
    await this.router.navigate(['/authentication/login']);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  public refreshToken(): void {
    const modalRef = this.ngbModal.open(RefreshModalComponent);
    modalRef.componentInstance.email = this.getTokenEmail();
    this.removeToken();
    modalRef.result.then(
      (e) => this.handleRefreshSuccess(e),
      () => this.router.navigate(['/authentication/login'])
    );
  }

  private handleRefreshSuccess(result: LoginRequest): void {
    this.login(result).subscribe(
      (response) => this.setToken(response.result.token),
      () => this.router.navigate(['/authentication/login'])
    );
  }

  private getDecodedToken(): JwtReturn {
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

  public isUserLoggedIn(): boolean {
    const token = this.getToken();

    if (!token || this.isTokenExpired()) return false;

    return true;
  }
}
