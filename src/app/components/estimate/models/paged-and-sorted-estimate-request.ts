import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class PagedAndSortedEstimateRequest extends PagedAndSortedRequest {
  public name: string;
  public supplierId: string;

  public constructor(
    name: string,
    supplierId: string,
    request: PagedAndSortedRequest
  ) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.name = name;
    this.supplierId = supplierId;
  }
}
