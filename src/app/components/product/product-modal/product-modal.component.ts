import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/services/product.service';
import { ProductResponse } from '../models/product-response';
import { UpdateProductRequest } from '../models/update-product-request';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  public form: FormGroup;

  @Input() private productId: string;

  public constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public activeModal: NgbActiveModal
  ) {}

  public ngOnInit(): void {
    this.fetchProductIfAny();
    this.createForm();
  }

  private mapValues(product: ProductResponse): void {
    this.form.controls['name'].setValue(product.name);
  }

  private fetchProductIfAny(): void {
    if (this.productId)
      this.productService
        .fetchProductDetails(this.productId)
        .subscribe((e: ProductResponse) => this.mapValues(e));
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  public get canSave(): boolean {
    return this.form.valid && this.form.dirty;
  }

  public save(): void {
    const payload = new UpdateProductRequest(
      this.productId,
      this.form.get('name').value
    );

    this.activeModal.close(payload);
  }
}
