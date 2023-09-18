import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'api';
import { LoginRequest } from '../components/autenticacao/models/login-request';
import { LoginResponse } from '../components/autenticacao/models/login-response';
import { RegistrarRequest } from '../components/autenticacao/models/registrar-request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  public login(loginRequest: LoginRequest) : Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${Api.ORCAMENTO_API}/autenticacao/login`, loginRequest);
  }

  public registrar(registrarRequest: RegistrarRequest) : Observable<any> {
    return this.httpClient.post(`${Api.ORCAMENTO_API}/autenticacao/login`, registrarRequest);
  }
}
