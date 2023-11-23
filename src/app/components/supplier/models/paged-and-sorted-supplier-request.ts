import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class BuscarFornecedoresPaginadoRequest extends PagedAndSortedRequest {
  nome: string;

  constructor(nome: string, request: PagedAndSortedRequest) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.nome = nome;
  }
}
