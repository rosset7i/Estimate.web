import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ListAction } from 'src/app/core/models/list-action';
import { ColumnDefinition } from 'src/app/core/models/column-definition';
import { ListDefinition } from 'src/app/core/models/list-definition';
import { ProductService } from 'src/app/services/product.service';
import { ProductsInEstimateResponse } from '../models/product-in-estimate-response';
import { PagedAndSortedProductRequest } from '../../product/models/paged-and-sorted-product-request';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css'],
})
export class ProdutSelectComponent implements OnInit {
  public listDefinition: ListDefinition;
  private param: string;
  private productsIdsToFilter: string[] = [];

  @Input() form: FormGroup;
  @Input() selectedProducts: ProductsInEstimateResponse[];
  @Input() disabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.createDefinition();
    this.mapValues();
  }

  get rows() {
    return this.form.get('productsIdsToFilter') as FormArray;
  }

  private mapValues() {
    this.selectedProducts.forEach((e) => this.addProduct(e));
  }

  private addNewForm(produto: any) {
    const linhaDoForm = this.formBuilder.group({
      productId: [produto.id, Validators.required],
      name: [
        {
          value: produto.name,
          disabled: true,
        },
      ],
      quantity: [
        produto.quantidade,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      unitPrice: [
        produto.precoUnitario,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });

    if (this.disabled) linhaDoForm.disable();

    this.rows.push(linhaDoForm);
  }

  public removeProduct(index: number) {
    this.form.markAsDirty();
    this.rows.removeAt(index);
    this.productsIdsToFilter.splice(index, 1);
    this.listDefinition.refreshTable();
  }

  public addProduct(selectedProduct: any) {
    this.addNewForm(selectedProduct);
    this.productsIdsToFilter.push(selectedProduct.id);
    this.listDefinition.refreshTable();
  }

  public filter(nome: string) {
    this.param = nome;
    this.listDefinition.refreshTable();
  }

  private fetch(request: PagedAndSortedProductRequest) {
    request.name = this.param;
    request.productIdsToFilter = this.productsIdsToFilter;

    this.productService
      .fetchPagedProducts(request)
      .subscribe((e) => (this.listDefinition.items = e));
  }

  private createDefinition() {
    this.listDefinition = new ListDefinition(
      'Products',
      this.createColumns(),
      this.createActions(),
      (request) => this.fetch(request)
    );
  }

  private createColumns() {
    const definicoes: ColumnDefinition[] = [
      {
        name: 'Name',
        mapFrom: 'name',
        hasSorting: true,
      },
    ];

    return definicoes;
  }

  private createActions() {
    const acoes: ListAction[] = [
      {
        icon: 'bi bi-plus',
        style: 'btn btn-outline-success btn-sm',
        callback: (productid: string) => this.addProduct(productid),
        disabled: this.disabled,
      },
    ];

    return acoes;
  }
}
