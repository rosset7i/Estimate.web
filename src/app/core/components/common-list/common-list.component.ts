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
  @Input() listDefinition: ListDefinition;

  sizeOptions = Sizes;
  size: number = 10;
  currentPage: number = 1;
  sortDirection: string = null;
  sortColumn: string = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetch();
    this.refreshTable();
  }

  sort(coluna: string) {
    this.sortColumn = coluna;

    if (this.sortDirection === Direction.ASC) {
      this.sortDirection = Direction.DESC;
    } else {
      this.sortDirection = Direction.ASC;
    }

    this.fetch();
  }

  fetch() {
    const paginadoRequest = new PagedAndSortedRequest(
      this.currentPage,
      this.size,
      this.sortColumn,
      this.sortDirection
    );

    this.listDefinition.callback(paginadoRequest);
  }

  callMethod(action: ListAction, item: any) {
    const modalDef = new ModalDefinition(
      'Attention!',
      action.confirmationMessage,
      true
    );

    if (action.hasConfirmation)
      this.messageService.openMessageModal(modalDef).then((e) => {
        if (e) action.callback(item);
      });
    else {
      action.callback(item);
    }
  }

  refreshTable() {
    this.listDefinition.refresh.subscribe(() => this.fetch());
  }
}
