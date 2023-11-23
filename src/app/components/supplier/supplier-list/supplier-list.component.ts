import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ListAction } from 'src/app/core/models/list-action';
import { ColumnDefinition } from 'src/app/core/models/column-definition';
import { ListDefinition } from 'src/app/core/models/list-definition';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierModalComponent } from '../supplier-modal/supplier-modal.component';
import { UpdateSupplierRequest } from '../models/update-supplier-request';
import { CreateSupplierRequest } from '../models/create-supplier-request';
import { PagedAndSortedSupplierRequest } from '../models/paged-and-sorted-supplier-request';
import { DELETE_MESSAGE } from 'src/app/core/utils/const';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements OnInit {
  listDefinition: ListDefinition;
  param: string;

  constructor(
    private supplierService: SupplierService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.createList();
  }

  openModal(supplierId?: string) {
    const modalRef = this.modalService.open(SupplierModalComponent);

    modalRef.componentInstance.supplierId = supplierId;

    modalRef.result.then((e) => {
      if (e && !supplierId) this.createSupplier(e);
      if (e && supplierId) this.editSupplier(supplierId, e);
    });
  }

  filter(nome: string) {
    this.param = nome;
    this.listDefinition.refreshTable();
  }

  fetch(request: PagedAndSortedSupplierRequest) {
    request.name = this.param;

    this.supplierService.fetchPagedSuppliers(request).subscribe((response) => {
      this.listDefinition.items = response;
    });
  }

  createSupplier(request: CreateSupplierRequest) {
    this.supplierService
      .createSupplier(request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  editSupplier(supplierId: string, request: UpdateSupplierRequest) {
    this.supplierService
      .updateSupplier(supplierId, request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  delete(supplierId: string) {
    this.supplierService
      .deleteSupplier(supplierId)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  createList() {
    this.listDefinition = new ListDefinition(
      'Suppliers',
      this.createColumns(),
      this.createActions(),
      (request) => this.fetch(request)
    );
  }

  createColumns() {
    const definition: ColumnDefinition[] = [
      {
        name: 'Name',
        mapFrom: 'name',
        hasSorting: true,
      },
    ];

    return definition;
  }

  createActions() {
    const actions: ListAction[] = [
      {
        icon: 'bi bi-pencil',
        style: 'btn btn-outline-dark me-2',
        callback: (supplier) => this.openModal(supplier?.id),
      },
      {
        icon: 'bi bi-trash',
        style: 'btn btn-outline-danger me-2',
        callback: (supplier) => this.delete(supplier?.id),
        hasConfirmation: true,
        confirmationMessage: DELETE_MESSAGE,
      },
    ];

    return actions;
  }
}
