import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ListAction } from 'src/app/core/models/list-action';
import { ColumnDefinition } from 'src/app/core/models/column-definition';
import { ListDefinition } from 'src/app/core/models/list-definition';
import { ProductService } from 'src/app/services/product.service';
import { ProductsInEstimateResponse } from '../../models/product-in-estimate-response';
import { PagedAndSortedProductRequest } from '../../../product/models/paged-and-sorted-product-request';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css'],
})
export class ProductSelectComponent implements OnInit {
  public listDefinition: ListDefinition;
  private param: string;
  private productsIdsToFilter: string[] = [];

  @Input() public form: FormGroup;
  @Input() public selectedProducts: ProductsInEstimateResponse[];
  @Input() public disabled: boolean = false;

  public constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  public ngOnInit(): void {
    this.createDefinition();
    this.mapValues();
  }

  public get rows(): FormArray {
    return this.form.get('productsInEstimate') as FormArray;
  }

  private mapValues(): void {
    this.selectedProducts.forEach((e) => this.addProduct(e));
  }

  private addNewForm(product: ProductsInEstimateResponse): void {
    const formRow = this.formBuilder.group({
      productId: [product.id, Validators.required],
      name: [
        {
          value: product.name,
          disabled: true,
        },
      ],
      quantity: [
        product.quantity,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      unitPrice: [
        product.unitPrice,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });

    if (this.disabled) formRow.disable();

    this.rows.push(formRow);
  }

  public removeProduct(index: number): void {
    this.form.markAsDirty();
    this.rows.removeAt(index);
    this.productsIdsToFilter.splice(index, 1);
    this.listDefinition.refreshTable();
  }

  private addProduct(selectedProduct: ProductsInEstimateResponse): void {
    this.addNewForm(selectedProduct);
    this.productsIdsToFilter.push(selectedProduct.id);
    this.listDefinition.refreshTable();
  }

  public filter(nome: string): void {
    this.param = nome;
    this.listDefinition.refreshTable();
  }

  private fetch(request: PagedAndSortedProductRequest): void {
    request.name = this.param;
    request.productsIdsToFilter = this.productsIdsToFilter;

    this.productService
      .fetchPagedProducts(request)
      .subscribe((e) => (this.listDefinition.items = e));
  }

  private createDefinition(): void {
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
    const action: ListAction[] = [
      {
        icon: 'bi bi-plus',
        style: 'btn btn-outline-success btn-sm',
        callback: (product: ProductsInEstimateResponse) => this.addProduct(product),
        disabled: this.disabled,
      },
    ];

    return action;
  }
}
