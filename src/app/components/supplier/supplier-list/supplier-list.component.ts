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
  public listDefinition: ListDefinition;
  private param: string;

  public constructor(
    private supplierService: SupplierService,
    private modalService: NgbModal
  ) {}

  public ngOnInit(): void {
    this.createList();
  }

  public async openModal(supplierId?: string): Promise<void> {
    const modalRef = this.modalService.open(SupplierModalComponent);

    modalRef.componentInstance.supplierId = supplierId;

    await modalRef.result.then((e) => {
      if (e && !supplierId) this.createSupplier(e);
      if (e && supplierId) this.editSupplier(e);
    });
  }

  public filter(nome: string): void {
    this.param = nome;
    this.listDefinition.refreshTable();
  }

  private fetch(request: PagedAndSortedSupplierRequest): void {
    request.name = this.param;

    this.supplierService.fetchPagedSuppliers(request).subscribe((response) => {
      this.listDefinition.items = response;
    });
  }

  private createSupplier(request: CreateSupplierRequest): void {
    this.supplierService
      .createSupplier(request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  private editSupplier(request: UpdateSupplierRequest): void {
    this.supplierService
      .updateSupplier(request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  private delete(supplierId: string): void {
    this.supplierService
      .deleteSupplier(supplierId)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  private createList(): void {
    this.listDefinition = new ListDefinition(
      'Suppliers',
      this.createColumns(),
      this.createActions(),
      (request: PagedAndSortedSupplierRequest) => this.fetch(request)
    );
  }

  private createColumns(): ColumnDefinition[] {
    const definition: ColumnDefinition[] = [
      {
        name: 'Name',
        mapFrom: 'name',
        hasSorting: true,
      },
    ];

    return definition;
  }

  private createActions(): ListAction[] {
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
