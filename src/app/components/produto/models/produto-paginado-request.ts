import { PaginadoOrdenadoRequest } from '../../../core/models/paginado-ordenado-request';

export class ProdutoPaginadoRequest extends PaginadoOrdenadoRequest {
  nome: string;
  produtoIdsParaFiltrar: string[];

  constructor(
    nome: string,
    idsDeProdutosParaFiltrar: string[],
    request: PaginadoOrdenadoRequest
  ) {
    super(
      request.pagina,
      request.tamanhoDePagina,
      request.ordenarPor,
      request.ordem
    );
    this.nome = nome;
    this.produtoIdsParaFiltrar = idsDeProdutosParaFiltrar;
  }
}
