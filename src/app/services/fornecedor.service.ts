import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from 'api';
import { AtualizarFornecedorRequest } from '../components/fornecedor/models/atualizar-fornecedor-request';
import { CriarFornecedorRequest } from '../components/fornecedor/models/criar-fornecedor-request';
import { BuscarFornecedoresPaginadoRequest as PagedAndSortedSupplierRequest } from '../components/fornecedor/models/fornecedor-paginado-request';
import { FornecedorResponse } from '../components/fornecedor/models/fornecedor-response';
import { ResultadoPaginadoDe } from '../core/models/resultado-paginado';
import { ServiceBase } from '../core/services/service-base.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends ServiceBase {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private buildSupplierParams(paginadoRequest: PagedAndSortedSupplierRequest) {
    let params = this.buildParams(paginadoRequest);
    if (paginadoRequest.nome)
      params = params.append('nome', paginadoRequest.nome);

    return params;
  }

  public fetchPagedSuppliers(
    paginadoRequest?: PagedAndSortedSupplierRequest
  ): Observable<ResultadoPaginadoDe<FornecedorResponse>> {
    return this.httpClient.get<ResultadoPaginadoDe<FornecedorResponse>>(
      `${Api.ESTIMATE_API}/fornecedores`,
      { params: this.buildSupplierParams(paginadoRequest) }
    );
  }

  public fetchSupplierDetails(
    fornecedorId?: string
  ): Observable<FornecedorResponse> {
    return this.httpClient.get<FornecedorResponse>(
      `${Api.ESTIMATE_API}/fornecedores/${fornecedorId}`
    );
  }

  public createSupplier(
    criarFornecedorRequest: CriarFornecedorRequest
  ): Observable<any> {
    return this.httpClient.post(
      `${Api.ESTIMATE_API}/fornecedores`,
      criarFornecedorRequest
    );
  }

  public updateSupplier(
    fornecedorId: string,
    atualizarFornecedorRequest: AtualizarFornecedorRequest
  ): Observable<any> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/fornecedores/${fornecedorId}/atualizar`,
      atualizarFornecedorRequest
    );
  }

  public deleteSupplier(fornecedorId: string): Observable<any> {
    return this.httpClient.delete(
      `${Api.ESTIMATE_API}/fornecedores/${fornecedorId}/remover`
    );
  }
}
