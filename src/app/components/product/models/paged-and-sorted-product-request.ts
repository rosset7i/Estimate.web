import { PagedAndSortedRequest } from '../../../core/models/paged-and-sorted-request';

export class PagedAndSortedProductRequest extends PagedAndSortedRequest {
  name: string;
  productsIdsToFilter: string[];

  constructor(
    name: string,
    productsIdsToFilter: string[],
    request: PagedAndSortedRequest
  ) {
    super(request.page, request.pageSize, request.sortBy, request.direction);
    this.name = name;
    this.productsIdsToFilter = productsIdsToFilter;
  }
}
