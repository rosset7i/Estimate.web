export class PagedResultOf<TResponse> {
  public totalPages: number;
  public totalItems: number;
  public currentPage: number;
  public items: TResponse[];

  public constructor(
    totalPages: number,
    totalItems: number,
    currentPage: number,
    items: TResponse[]
  ) {
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.items = items;
  }
}
