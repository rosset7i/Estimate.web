import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from 'api';
import { AtualizarFornecedorRequest } from '../components/fornecedor/models/atualizar-fornecedor-request';
import { CriarFornecedorRequest } from '../components/fornecedor/models/criar-fornecedor-request';
import { BuscarFornecedoresPaginadoRequest } from '../components/fornecedor/models/fornecedor-paginado-request';
import { FornecedorResponse } from '../components/fornecedor/models/fornecedor-response';
import { ResultadoPaginadoDe } from '../core/models/resultado-paginado';
import { ServiceBase } from '../core/services/service-base.service';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService extends ServiceBase {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private buildFornecedorParams(
    paginadoRequest: BuscarFornecedoresPaginadoRequest
  ) {
    let params = this.buildParams(paginadoRequest);
    if (paginadoRequest.nome)
      params = params.append('nome', paginadoRequest.nome);

    return params;
  }

  public buscaFornecedoresPaginado(
    paginadoRequest?: BuscarFornecedoresPaginadoRequest
  ): Observable<ResultadoPaginadoDe<FornecedorResponse>> {
    return this.httpClient.get<ResultadoPaginadoDe<FornecedorResponse>>(
      `${Api.ORCAMENTO_API}/fornecedores`,
      { params: this.buildFornecedorParams(paginadoRequest) }
    );
  }

  public buscaFornecedorDetalhes(
    fornecedorId?: string
  ): Observable<FornecedorResponse> {
    return this.httpClient.get<FornecedorResponse>(
      `${Api.ORCAMENTO_API}/fornecedores/${fornecedorId}`
    );
  }

  public criarFornecedor(
    criarFornecedorRequest: CriarFornecedorRequest
  ): Observable<any> {
    return this.httpClient.post(
      `${Api.ORCAMENTO_API}/fornecedores`,
      criarFornecedorRequest
    );
  }

  public atualizarFornecedor(
    fornecedorId: string,
    atualizarFornecedorRequest: AtualizarFornecedorRequest
  ): Observable<any> {
    return this.httpClient.put(
      `${Api.ORCAMENTO_API}/fornecedores/${fornecedorId}/atualizar`,
      atualizarFornecedorRequest
    );
  }

  public removerFornecedor(fornecedorId: string): Observable<any> {
    return this.httpClient.delete(
      `${Api.ORCAMENTO_API}/fornecedores/${fornecedorId}/remover`
    );
  }
}
