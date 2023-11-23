export class PagedResultOf<TResponse> {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  items: TResponse[];

  constructor(
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
