import { Direction } from "../utils/direction";

export class PagedAndSortedRequest {
  public page: number;
  public pageSize: number;
  public sortBy: string;
  public direction: Direction;

  public constructor(
    page: number,
    pageSize: number,
    orderBy: string,
    direction: Direction
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.sortBy = orderBy;
    this.direction = direction;
  }
}
