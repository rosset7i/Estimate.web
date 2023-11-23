import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class PagedAndSortedEstimateRequest extends PagedAndSortedRequest {
  name: string;
  supplierId: string;

  constructor(
    nome: string,
    fornecedorId: string,
    request: PagedAndSortedRequest
  ) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.name = nome;
    this.supplierId = fornecedorId;
  }
}
