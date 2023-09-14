import { Subject } from 'rxjs';
import { ListAction } from './list-action';
import { ColumnDefinition } from './column-definition';
import { PagedResultOf } from './paged-result-of';

export class ListDefinition {
  public listName: string;
  public items: PagedResultOf<unknown>;
  public columns: ColumnDefinition[];
  public actions: ListAction[];
  public callback: (request: unknown) => void;
  public refresh = new Subject<void>();

  public constructor(
    listName: string,
    columns: ColumnDefinition[],
    actions: ListAction[],
    callback: (request: unknown) => void
  ) {
    this.listName = listName;
    this.columns = columns;
    this.actions = actions;
    this.callback = callback;
  }

  public refreshTable(): void {
    this.refresh.next();
  }
}
