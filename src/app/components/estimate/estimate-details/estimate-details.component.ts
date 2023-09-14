import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PagedAndSortedRequest } from 'src/app/core/models/paged-and-sorted-request';
import { SupplierService } from 'src/app/services/supplier.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ModalDefinition } from 'src/app/core/models/modal-definition';
import { EstimateDetailsResponse } from '../models/estimate-details-response';
import { ProductsInEstimateResponse } from '../models/product-in-estimate-response';
import { SupplierResponse } from '../../supplier/models/supplier-response';
import { PagedAndSortedSupplierRequest } from '../../supplier/models/paged-and-sorted-supplier-request';

@Component({
  selector: 'app-estimate-details',
  templateUrl: './estimate-details.component.html',
  styleUrls: ['./estimate-details.component.css'],
})
export class EstimateDetailsComponent implements OnInit {
  public form: FormGroup;
  private estimateId: string;
  public selected: string;
  public productsInEstimate: ProductsInEstimateResponse[];
  public suppliers: SupplierResponse[];
  public disabled: boolean = false;
  public searchFields = ['name'];

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private supplierService: SupplierService,
    private estimateService: EstimateService
  ) {}

  public ngOnInit(): void {
    this.fetchSuppliers();
    this.fetchEstimate();
    this.createForm();
  }

  private fetchEstimate(): void {
    this.estimateId = this.activatedRoute.snapshot.params['estimateId'];
    if (this.estimateId) {
      this.estimateService
        .fetchEstimateDetails(this.estimateId)
        .subscribe((e) => this.mapValues(e.result));
    } else {
      this.productsInEstimate = [];
    }
  }

  private mapValues(estimateDetails: EstimateDetailsResponse): void {
    this.form.get('name').setValue(estimateDetails.name);
    this.form.get('supplierId').setValue(estimateDetails.supplierId);
    this.selected = estimateDetails.supplierName;
    this.productsInEstimate = estimateDetails.productsInEstimate;

    if (this.router.url.includes('view')) {
      this.form.disable();
      this.disabled = true;
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(75)]),
      ],
      supplierId: ['', Validators.required],
      estimateId: [this.estimateId, Validators.required],
      productsInEstimate: this.formBuilder.array([]),
    });
  }

  private fetchSuppliers(): void {
    const page = new PagedAndSortedRequest(1, 10, null, null);
    const page2 = new PagedAndSortedSupplierRequest(null, page);
    this.supplierService
      .fetchPagedSuppliers(page2)
      .subscribe((e) => (this.suppliers = e.items));
  }

  public selectSupplier(supplier: SupplierResponse): void {
    this.form.markAsDirty();
    this.form.get('supplierId').setValue(supplier.id);
  }

  public get canSave(): boolean {
    return this.form.valid && this.form.dirty;
  }

  public save(): void {
    if (this.estimateId) {
      this.estimateService
        .updateEstimate(this.form.value)
        .subscribe(() => this.navigateToList());
    } else {
      this.estimateService
        .createEstimate(this.form.value)
        .subscribe(() => this.navigateToList());
    }
  }

  private async navigateToList(): Promise<void> {
    await this.success();
    await this.router.navigate(['/home/estimates']);
  }

  private async success(): Promise<void> {
    await this.messageService.openMessageModal(
      new ModalDefinition('Success!', null, false)
    );
  }
}
