export class PagedAndSortedRequest {
  page: number;
  pageSize: number;
  sortBy: string;
  direction: string;

  constructor(
    page: number,
    pageSize: number,
    orderBy: string,
    direction: string
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.sortBy = orderBy;
    this.direction = direction;
  }
}
