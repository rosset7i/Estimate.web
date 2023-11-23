import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class OrcamentoPaginadoRequest extends PagedAndSortedRequest {
  nome: string;
  fornecedorId: string;

  constructor(
    nome: string,
    fornecedorId: string,
    request: PagedAndSortedRequest
  ) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.nome = nome;
    this.fornecedorId = fornecedorId;
  }
}
