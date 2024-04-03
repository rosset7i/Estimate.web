import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  public constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public canActivate(): boolean {
    if (this.authenticationService.isUserLoggedIn()) return true;

    this.router.navigate(['/authentication/login']);
    return false;
  }
}
