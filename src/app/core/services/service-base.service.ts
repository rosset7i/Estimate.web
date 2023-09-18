import { HttpParams } from '@angular/common/http';
import { PaginadoOrdenadoRequest } from './../models/paginado-ordenado-request';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceBase {

  constructor() { }

  protected buildParams(paginadoOrdenadoRequest: PaginadoOrdenadoRequest) : HttpParams {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pagina', paginadoOrdenadoRequest.pagina);
    queryParams = queryParams.append('tamanhoDePagina', paginadoOrdenadoRequest.tamanhoDePagina);
    queryParams = queryParams.append('ordenarPor', paginadoOrdenadoRequest.ordenarPor);
    queryParams = queryParams.append('ordem', paginadoOrdenadoRequest.ordem);

    return queryParams;
  }
}
