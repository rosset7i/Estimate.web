import { Component, Input, OnInit } from '@angular/core';

import { ListDefinition } from '../../models/list-definition';
import { PagedAndSortedRequest } from '../../models/paged-and-sorted-request';
import { Direction } from '../../utils/direction';
import { Sizes } from '../../utils/page-size';
import { MessageService } from '../../services/message.service';
import { ListAction } from '../../models/list-action';
import { ModalDefinition } from '../../models/modal-definition';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.css'],
})
export class CommonListComponent implements OnInit {
  @Input() public listDefinition: ListDefinition;

  public sizeOptions = Sizes;
  public size: number = 10;
  public currentPage: number = 1;
  public sortDirection: Direction = null;
  public sortColumn: string = null;

  public constructor(private messageService: MessageService) {}

  public ngOnInit(): void {
    this.fetch();
    this.refreshTable();
  }

  public sort(column: string): void {
    this.sortColumn = column;

    if (this.sortDirection === Direction.ASC) {
      this.sortDirection = Direction.DESC;
    } else {
      this.sortDirection = Direction.ASC;
    }

    this.fetch();
  }

  public fetch(): void {
    const pagedRequest = new PagedAndSortedRequest(
      this.currentPage,
      this.size,
      this.sortColumn,
      this.sortDirection
    );

    this.listDefinition.callback(pagedRequest);
  }

  public async callMethod(action: ListAction, item: unknown): Promise<void> {
    const modalDef = new ModalDefinition(
      'Attention!',
      action.confirmationMessage,
      true
    );

    if (action.hasConfirmation)
      await this.messageService.openMessageModal(modalDef).then((e) => {
        if (e) action.callback(item);
      });
    else {
      action.callback(item);
    }
  }

  public refreshTable(): void {
    this.listDefinition.refresh.subscribe(() => this.fetch());
  }
}
