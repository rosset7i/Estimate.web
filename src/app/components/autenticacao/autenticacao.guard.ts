import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AutenticacaoService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoGuard implements CanActivate {
  constructor(private router: Router, private autenticacaoService: AutenticacaoService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.autenticacaoService.isUserLoggedIn()) return true;

    this.router.navigate(['/autenticacao/login']);
    return false;
  }
}
