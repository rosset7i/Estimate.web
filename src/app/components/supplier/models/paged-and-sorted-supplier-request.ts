import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class PagedAndSortedSupplierRequest extends PagedAndSortedRequest {
  public name: string;

  public constructor(name: string, request: PagedAndSortedRequest) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.name = name;
  }
}
