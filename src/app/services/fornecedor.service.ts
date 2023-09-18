import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase } from '../core/services/service-base.service';
import { PaginadoOrdenadoRequest } from '../core/models/paginado-ordenado-request';
import { Api } from 'api';
import { Observable } from 'rxjs';
import { ResultadoPaginadoDe } from '../core/models/resultado-paginado';
import { FornecedorResponse } from '../components/fornecedor/models/fornecedor-response';
import { AtualizarFornecedorRequest } from '../components/fornecedor/models/atualizar-fornecedor-request';
import { CriarFornecedorRequest } from '../components/fornecedor/models/criar-fornecedor-request';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends ServiceBase {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public buscaFornecedoresPaginado(paginadoRequest: PaginadoOrdenadoRequest) : Observable<ResultadoPaginadoDe<FornecedorResponse>>{
    return this.httpClient.get<ResultadoPaginadoDe<FornecedorResponse>>(`${Api.ORCAMENTO_API}/fornecedores`, { params: this.buildParams(paginadoRequest) });
  }

  public criarFornecedor(criarFornecedorRequest: CriarFornecedorRequest) : Observable<any>{
    return this.httpClient.post(`${Api.ORCAMENTO_API}/fornecedores`, criarFornecedorRequest);
  }

  public atualizarFornecedor(fornecedorId: string, atualizarFornecedorRequest: AtualizarFornecedorRequest) : Observable<any>{
    return this.httpClient.put(`${Api.ORCAMENTO_API}/fornecedores/${fornecedorId}/atualizar`, atualizarFornecedorRequest);
  }

  public removerFornecedor(fornecedorId: string) : Observable<any>{
    return this.httpClient.delete(`${Api.ORCAMENTO_API}/fornecedores/${fornecedorId}/remover`);
  }
}
