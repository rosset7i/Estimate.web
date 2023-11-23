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
import { DELETE_MESSAGE } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  listDefinition: ListDefinition;
  param: string;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.createOptions();
  }

  openModal(productId?: string) {
    const modalRef = this.modalService.open(ProductModalComponent);

    modalRef.componentInstance.productId = productId;

    modalRef.result.then((e) => {
      if (e && !productId) this.createProduct(e);
      if (e && productId) this.editProduct(productId, e);
    });
  }

  filter(name: string) {
    this.param = name;
    this.listDefinition.refreshTable();
  }

  fetch(request: PagedAndSortedProductRequest) {
    request.name = this.param;

    this.productService
      .fetchPagedProducts(request)
      .subscribe((e) => (this.listDefinition.items = e));
  }

  createProduct(request: CreateProductRequest) {
    this.productService
      .createProduct(request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  editProduct(productId: string, request: UpdateProductRequest) {
    this.productService
      .updateProduct(productId, request)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  deleteProduct(productId: string) {
    this.productService
      .deleteProduct(productId)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  createOptions() {
    this.listDefinition = new ListDefinition(
      'Products',
      this.createColumns(),
      this.createActions(),
      (request) => this.fetch(request)
    );
  }

  createColumns() {
    const definicoes: ColumnDefinition[] = [
      {
        name: 'Name',
        mapFrom: 'name',
        hasSorting: true,
      },
    ];

    return definicoes;
  }

  createActions() {
    const acoes: ListAction[] = [
      {
        icon: 'bi bi-pencil',
        style: 'btn btn-outline-dark me-2',
        callback: (product) => this.openModal(product?.id),
      },
      {
        icon: 'bi bi-trash',
        style: 'btn btn-outline-danger me-2',
        callback: (product) => this.deleteProduct(product.id),
        hasConfirmation: true,
        confirmationMessage: DELETE_MESSAGE,
      },
    ];

    return acoes;
  }
}
