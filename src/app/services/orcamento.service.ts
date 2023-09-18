import { Injectable } from '@angular/core';
import { ServiceBase } from '../core/services/service-base.service';
import { Api } from 'api';
import { Observable } from 'rxjs';
import { AtualizarOrcamentoRequest } from '../components/orcamento/models/atualizar-orcamento-request';
import { CriarOrcamentoRequest } from '../components/orcamento/models/criar-orcamento-request';
import { OrcamentoResponse } from '../components/orcamento/models/orcamento-response';
import { PaginadoOrdenadoRequest } from '../core/models/paginado-ordenado-request';
import { ResultadoPaginadoDe } from '../core/models/resultado-paginado';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService extends ServiceBase {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public buscaOrcamentosPaginado(paginadoRequest: PaginadoOrdenadoRequest) : Observable<ResultadoPaginadoDe<OrcamentoResponse>>{
    return this.httpClient.get<ResultadoPaginadoDe<OrcamentoResponse>>(`${Api.ORCAMENTO_API}/orcamentos`, { params: this.buildParams(paginadoRequest) });
  }

  public criarOrcamento(criarOrcamentoRequest: CriarOrcamentoRequest) : Observable<any>{
    return this.httpClient.post(`${Api.ORCAMENTO_API}/orcamentos`, criarOrcamentoRequest);
  }

  public atualizarOrcamento(orcamentoId: string, atualizarOrcamentoRequest: AtualizarOrcamentoRequest) : Observable<any>{
    return this.httpClient.put(`${Api.ORCAMENTO_API}/orcamentos/${orcamentoId}/atualizar`, atualizarOrcamentoRequest);
  }

  public removerOrcamento(orcamentoId: string) : Observable<any>{
    return this.httpClient.delete(`${Api.ORCAMENTO_API}/orcamentos/${orcamentoId}/remover`);
  }

}
