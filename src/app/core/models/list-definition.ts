import { Subject } from 'rxjs';
import { ListAction } from './list-action';
import { ColumnDefinition } from './column-definition';
import { PagedResultOf } from './paged-result-of';

export class ListDefinition {
  public listName: string;
  public items: PagedResultOf<any>;
  public columns: ColumnDefinition[];
  public actions: ListAction[];
  public callback: Function;
  public refresh = new Subject<void>();

  public constructor(
    listName: string,
    columns: ColumnDefinition[],
    actions: ListAction[],
    callback: Function
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
