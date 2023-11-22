import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class ProdutoPaginadoRequest extends PagedAndSortedRequest {
  nome: string;
  produtoIdsParaFiltrar: string[];

  constructor(
    nome: string,
    idsDeProdutosParaFiltrar: string[],
    request: PagedAndSortedRequest
  ) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.nome = nome;
    this.produtoIdsParaFiltrar = idsDeProdutosParaFiltrar;
  }
}
