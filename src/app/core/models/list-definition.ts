import { Subject } from 'rxjs';
import { ListAction } from './list-action';
import { ColumnDefinition } from './column-definition';
import { PagedResultOf } from './paged-result-of';

export class ListDefinition {
  listName: string;
  items: PagedResultOf<any>;
  columns: ColumnDefinition[];
  actions: ListAction[];
  callback: Function;
  refresh = new Subject<void>();

  constructor(
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

  public refreshTable() {
    this.refresh.next();
  }
}
