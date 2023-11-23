import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ListDefinition } from 'src/app/core/models/list-definition';
import { PagedAndSortedRequest } from 'src/app/core/models/paged-and-sorted-request';
import { SupplierService } from 'src/app/services/supplier.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ModalDefinition } from 'src/app/core/models/modal-definition';
import { EstimateDetailsResponse } from '../models/estimate-details-response';
import { ProductsInEstimateResponse } from '../models/product-in-estimate-response';
import { FornecedorResponse } from '../../supplier/models/supplier-response';
import { PagedAndSortedSupplierRequest } from '../../supplier/models/paged-and-sorted-supplier-request';

@Component({
  selector: 'app-estimate-details',
  templateUrl: './estimate-details.component.html',
  styleUrls: ['./estimate-details.component.css'],
})
export class EstimateDetailsComponent implements OnInit {
  form: FormGroup;
  estimateId: string;
  selected: string;
  productsInEstimate: ProductsInEstimateResponse[];
  suppliers: FornecedorResponse[];
  listDefinition: ListDefinition;
  disabled: boolean = false;
  searchFields = ['name'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private supplierService: SupplierService,
    private estimateService: EstimateService
  ) {}

  ngOnInit(): void {
    this.fetchSuppliers();
    this.fetchEstimate();
    this.criarForm();
  }

  fetchEstimate() {
    this.estimateId = this.activatedRoute.snapshot.params['estimateId'];
    if (this.estimateId) {
      this.estimateService
        .fetchEstimateDetails(this.estimateId)
        .subscribe((e) => this.mapValues(e));
    } else {
      this.productsInEstimate = [];
    }
  }

  mapValues(estiamateDetails: EstimateDetailsResponse) {
    this.form.get('name').setValue(estiamateDetails.name);
    this.form.get('estimateId').setValue(estiamateDetails.supplierId);
    this.selected = estiamateDetails.supplierName;
    this.productsInEstimate = estiamateDetails.productsInEstimate;

    if (this.router.url.includes('visualizar')) {
      this.form.disable();
      this.disabled = true;
    }
  }

  private criarForm() {
    this.form = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(75)]),
      ],
      fornecedorId: ['', Validators.required],
      produtosNoOrcamento: this.formBuilder.array([]),
    });
  }

  private fetchSuppliers() {
    const pagina = new PagedAndSortedRequest(1, 10, null, null);
    const pagina2 = new PagedAndSortedSupplierRequest(null, pagina);
    this.supplierService
      .fetchPagedSuppliers(pagina2)
      .subscribe((e) => (this.suppliers = e.items));
  }

  public selectSupplier(fornecedor: FornecedorResponse) {
    this.form.markAsDirty();
    this.form.get('fornecedorId').setValue(fornecedor.id);
  }

  get canSave() {
    return this.form.valid && this.form.dirty;
  }

  save() {
    if (this.estimateId) {
      this.estimateService
        .updateEstimate(this.estimateId, this.form.value)
        .subscribe(() => this.navigateToList());
    } else {
      this.estimateService
        .createEstimate(this.form.value)
        .subscribe(() => this.navigateToList());
    }
  }

  navigateToList() {
    this.success();
    this.router.navigate(['/home/estimates']);
  }

  success() {
    this.messageService.openMessageModal(
      new ModalDefinition('Success!', null, false)
    );
  }
}
