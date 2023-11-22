import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResultadoPaginadoDe } from '../core/models/resultado-paginado';
import { ProdutoResponse } from '../components/produto/models/produto-response';
import { Api } from 'api';
import { ServiceBase } from '../core/services/service-base.service';
import { CriarProdutoRequest } from '../components/produto/models/criar-produto-request';
import { AtualizarProdutoRequest } from '../components/produto/models/atualizar-produto-request';
import { ProdutoPaginadoRequest } from '../components/produto/models/produto-paginado-request';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends ServiceBase {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private buildProdutoFilter(request: ProdutoPaginadoRequest) {
    let params = this.buildParams(request);
    if (request.nome) params = params.append('nome', request.nome);
    if (request.produtoIdsParaFiltrar)
      request.produtoIdsParaFiltrar.forEach(
        (e) => (params = params.append('produtoIdsParaFiltrar', e))
      );

    return params;
  }

  public buscaProdutosPaginado(
    paginadoRequest: ProdutoPaginadoRequest
  ): Observable<ResultadoPaginadoDe<ProdutoResponse>> {
    return this.httpClient.get<ResultadoPaginadoDe<ProdutoResponse>>(
      `${Api.ESTIMATE_API}/produtos`,
      { params: this.buildProdutoFilter(paginadoRequest) }
    );
  }

  public buscaProdutosDetalhes(produtoId: string): Observable<ProdutoResponse> {
    return this.httpClient.get<ProdutoResponse>(
      `${Api.ESTIMATE_API}/produtos/${produtoId}`
    );
  }

  public criarProduto(
    criarProdutoRequest: CriarProdutoRequest
  ): Observable<any> {
    return this.httpClient.post(
      `${Api.ESTIMATE_API}/produtos`,
      criarProdutoRequest
    );
  }

  public atualizarProduto(
    produtoId: string,
    atualizarProdutoRequest: AtualizarProdutoRequest
  ): Observable<any> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/produtos/${produtoId}/atualizar`,
      atualizarProdutoRequest
    );
  }

  public removerProduto(produtoId: string): Observable<any> {
    return this.httpClient.delete(
      `${Api.ESTIMATE_API}/produtos/${produtoId}/remover`
    );
  }
}
