import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PaginadoOrdenadoRequest } from './../models/paginado-ordenado-request';

@Injectable({
  providedIn: 'root',
})
export class ServiceBase {
  protected buildParams(
    paginadoOrdenadoRequest: PaginadoOrdenadoRequest
  ): HttpParams {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pagina', paginadoOrdenadoRequest.pagina);
    queryParams = queryParams.append(
      'tamanhoDePagina',
      paginadoOrdenadoRequest.tamanhoDePagina
    );
    queryParams = queryParams.append(
      'ordenarPor',
      paginadoOrdenadoRequest.ordenarPor
    );
    queryParams = queryParams.append('ordem', paginadoOrdenadoRequest.ordem);

    return queryParams;
  }
}
