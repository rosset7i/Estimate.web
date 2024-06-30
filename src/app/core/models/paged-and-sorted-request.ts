export class PagedAndSortedRequest {
  public page: number;
  public pageSize: number;
  public sortBy: string;
  public direction: string;

  public constructor(
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
