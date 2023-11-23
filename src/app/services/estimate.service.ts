import { DetalhesOrcamentoResponse } from './../components/orcamento/models/detalhes-orcamento-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Api } from 'api';
import { AtualizarOrcamentoRequest } from '../components/orcamento/models/atualizar-orcamento-request';
import { CriarOrcamentoRequest } from '../components/orcamento/models/criar-orcamento-request';
import { OrcamentoPaginadoRequest } from '../components/orcamento/models/orcamento-paginado-request';
import { OrcamentoResponse } from '../components/orcamento/models/orcamento-response';
import { ResultadoPaginadoDe } from '../core/models/paged-result-of';
import { ServiceBase } from '../core/services/service-base.service';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService extends ServiceBase {
  public adicionarProduto = new Subject<any>();
  public removerProduto = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    super();
  }

  private buildOrcamentoParams(paginadoRequest: OrcamentoPaginadoRequest) {
    let params = this.buildParams(paginadoRequest);
    if (paginadoRequest.nome)
      params = params.append('nome', paginadoRequest.nome);
    if (paginadoRequest.fornecedorId)
      params = params.append('fornecedorId', paginadoRequest.fornecedorId);

    return params;
  }

  public buscaOrcamentosPaginado(
    paginadoRequest: OrcamentoPaginadoRequest
  ): Observable<ResultadoPaginadoDe<OrcamentoResponse>> {
    return this.httpClient.get<ResultadoPaginadoDe<OrcamentoResponse>>(
      `${Api.ESTIMATE_API}/orcamentos`,
      { params: this.buildOrcamentoParams(paginadoRequest) }
    );
  }

  public buscaDetalhesOrcamento(
    orcamentoId: string
  ): Observable<DetalhesOrcamentoResponse> {
    return this.httpClient.get<DetalhesOrcamentoResponse>(
      `${Api.ESTIMATE_API}/orcamentos/${orcamentoId}`
    );
  }

  public criarOrcamento(
    criarOrcamentoRequest: CriarOrcamentoRequest
  ): Observable<any> {
    return this.httpClient.post(
      `${Api.ESTIMATE_API}/orcamentos`,
      criarOrcamentoRequest
    );
  }

  public atualizarOrcamento(
    orcamentoId: string,
    atualizarOrcamentoRequest: AtualizarOrcamentoRequest
  ): Observable<any> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/orcamentos/${orcamentoId}/atualizar`,
      atualizarOrcamentoRequest
    );
  }

  public removerOrcamento(orcamentoId: string): Observable<any> {
    return this.httpClient.delete(
      `${Api.ESTIMATE_API}/orcamentos/${orcamentoId}/remover`
    );
  }
}