import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierResponse } from '../models/supplier-response';
import { UpdateSupplierRequest } from '../models/update-supplier-request';

@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.css'],
})
export class SupplierModalComponent implements OnInit {
  public form: FormGroup;

  @Input() private supplierId: string;

  public constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    public activeModal: NgbActiveModal
  ) {}

  public ngOnInit(): void {
    this.fetchSupplierIfAny();
    this.createForm();
  }

  private mapValues(supplier: SupplierResponse): void {
    this.form.controls['name'].setValue(supplier.name);
  }

  private fetchSupplierIfAny(): void {
    if (this.supplierId)
      this.supplierService
        .fetchSupplierDetails(this.supplierId)
        .subscribe((e: SupplierResponse) => this.mapValues(e));
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
    const payload = new UpdateSupplierRequest(
      this.supplierId,
      this.form.get('name').value
    );

    this.activeModal.close(payload);
  }
}
