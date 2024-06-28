import { Component, OnInit } from '@angular/core';

import { ListAction } from 'src/app/core/models/list-action';
import { ColumnDefinition } from 'src/app/core/models/column-definition';
import { ListDefinition } from 'src/app/core/models/list-definition';
import { ProductService } from 'src/app/services/product.service';
import { UpdateProductRequest } from '../models/update-product-request';
import { PagedAndSortedProductRequest } from '../models/paged-and-sorted-product-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CreateProductRequest } from '../models/create-product-request';
import { DELETE_MESSAGE } from 'src/app/core/utils/const';
import { ProductResponse } from '../models/product-response';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public listDefinition: ListDefinition;
  private param: string;

  public constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  public ngOnInit(): void {
    this.createOptions();
  }

  public async openModal(productId?: string): Promise<void> {
    const modalRef = this.modalService.open(ProductModalComponent);

    modalRef.componentInstance.productId = productId;

    await modalRef.result.then((e) => {
      if (e && !productId) this.createProduct(e);
      if (e && productId) this.editProduct(e);
    });
  }

  public filter(name: string): void {
    this.param = name;
    this.listDefinition.refreshTable();
  }

  private fetch(request: PagedAndSortedProductRequest): void {
    request.name = this.param;

    this.productService
      .fetchPagedProducts(request)
      .subscribe((e) => (this.listDefinition.items = e));
  }

  private createProduct(request: CreateProductRequest): void {
    this.productService
      .createProduct(request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  private editProduct(request: UpdateProductRequest): void {
    this.productService
      .updateProduct(request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  private deleteProduct(productId: string): void {
    this.productService
      .deleteProduct(productId)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  private createOptions(): void {
    this.listDefinition = new ListDefinition(
      'Products',
      this.createColumns(),
      this.createActions(),
      (request: PagedAndSortedProductRequest) => this.fetch(request)
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
        callback: (product: ProductResponse) => this.openModal(product?.id),
      },
      {
        icon: 'bi bi-trash',
        style: 'btn btn-outline-danger me-2',
        callback: (product: ProductResponse) => this.deleteProduct(product.id),
        hasConfirmation: true,
        confirmationMessage: DELETE_MESSAGE,
      },
    ];

    return actions;
  }
}
