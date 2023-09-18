import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoPaginadoDe } from '../core/models/resultado-paginado';
import { ProdutoResponse } from '../components/produto/models/produto-response';
import { Api } from 'api';
import { PaginadoOrdenadoRequest } from '../core/models/paginado-ordenado-request';
import { ServiceBase } from '../core/services/service-base.service';
import { CriarProdutoRequest } from '../components/produto/models/criar-produto-request';
import { AtualizarProdutoRequest } from '../components/produto/models/atualizar-produto-request';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends ServiceBase {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public buscaProdutosPaginado(paginadoRequest: PaginadoOrdenadoRequest) : Observable<ResultadoPaginadoDe<ProdutoResponse>>{
    return this.httpClient.get<ResultadoPaginadoDe<ProdutoResponse>>(`${Api.ORCAMENTO_API}/produtos`, { params: this.buildParams(paginadoRequest) });
  }

  public criarProduto(criarProdutoRequest: CriarProdutoRequest) : Observable<any>{
    return this.httpClient.post(`${Api.ORCAMENTO_API}/produtos`, criarProdutoRequest);
  }

  public atualizarProduto(produtoId: string, atualizarProdutoRequest: AtualizarProdutoRequest) : Observable<any>{
    return this.httpClient.put(`${Api.ORCAMENTO_API}/produtos/${produtoId}/atualizar`, atualizarProdutoRequest);
  }

  public removerProduto(produtoId: string) : Observable<any>{
    return this.httpClient.delete(`${Api.ORCAMENTO_API}/produtos/${produtoId}/remover`);
  }
}
