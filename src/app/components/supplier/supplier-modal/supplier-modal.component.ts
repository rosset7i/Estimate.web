import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SupplierService } from 'src/app/services/supplier.service';
import { UpdateProductRequest } from '../../product/models/update-product-request';
import { SupplierResponse } from '../models/supplier-response';
import { UpdateSupplierRequest } from '../models/update-supplier-request';

@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.css'],
})
export class SupplierModalComponent implements OnInit {
  form: FormGroup;

  @Input() supplierId: string;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.fetchSupplierIfAny();
    this.createForm();
  }

  private mapValues(supplier: SupplierResponse) {
    this.form.controls['name'].setValue(supplier.name);
  }

  private fetchSupplierIfAny() {
    if (this.supplierId)
      this.supplierService
        .fetchSupplierDetails(this.supplierId)
        .subscribe((e: SupplierResponse) => this.mapValues(e));
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  get canSave() {
    return this.form.valid && this.form.dirty;
  }

  save() {
    const payload = new UpdateSupplierRequest(
      this.supplierId,
      this.form.get('name').value);

    this.activeModal.close(payload);
  }
}
