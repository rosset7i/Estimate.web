import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class PagedAndSortedProductRequest extends PagedAndSortedRequest {
  name: string;
  productIdsToFilter: string[];

  constructor(
    name: string,
    productIdsToFilter: string[],
    request: PagedAndSortedRequest
  ) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.name = name;
    this.productIdsToFilter = productIdsToFilter;
  }
}
