import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SupplierService } from 'src/app/services/supplier.service';
import { FornecedorResponse } from '../models/supplier-response';

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
  ) {}

  ngOnInit(): void {
    this.fetchSupplierIfAny();
    this.createForm();
  }

  private mapValues(supplier: FornecedorResponse) {
    this.form.controls['name'].setValue(supplier.name);
  }

  private fetchSupplierIfAny() {
    if (this.supplierId)
      this.supplierService
        .fetchSupplierDetails(this.supplierId)
        .subscribe((e: FornecedorResponse) => this.mapValues(e));
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
    this.activeModal.close(this.form.value);
  }
}
