import { Component, OnInit } from '@angular/core';

import { ListAction } from 'src/app/core/models/list-action';
import { ColumnDefinition } from 'src/app/core/models/column-definition';
import { ListDefinition } from 'src/app/core/models/list-definition';
import { EstimateService } from 'src/app/services/estimate.service';
import { UpdateEstimateRequest } from '../models/update-estimate-request';
import { PagedAndSortedEstimateRequest } from '../models/paged-and-sorted-estimate-request';
import { Router } from '@angular/router';
import { DELETE_MESSAGE } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css'],
})
export class EstimateListComponent implements OnInit {
  listDefinition: ListDefinition;
  param: string;

  constructor(
    private estimateService: EstimateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createList();
  }

  filter(name: string) {
    this.param = name;
    this.listDefinition.refreshTable();
  }

  fetch(request: PagedAndSortedEstimateRequest) {
    request.name = this.param;

    this.estimateService
      .fetchPagedEstimates(request)
      .subscribe((e) => (this.listDefinition.items = e));
  }

  navigateToEstimateEdit(estimateId: string) {
    this.router.navigate([`home/estimates/${estimateId}/edit`]);
  }

  navigateToEstimateView(estimateId: string) {
    this.router.navigate([`home/estimates/${estimateId}/view`]);
  }

  editEstimate(estimateId: string, updateEstimate: UpdateEstimateRequest) {
    this.estimateService
      .updateEstimate(estimateId, updateEstimate)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  deleteEstimate(orcamentoId: string) {
    this.estimateService
      .deleteEstimate(orcamentoId)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  createList() {
    this.listDefinition = new ListDefinition(
      'Estimates',
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
      {
        name: 'Supplier',
        mapFrom: 'supplierName',
        hasSorting: false,
      },
    ];

    return definicoes;
  }

  createActions() {
    const acoes: ListAction[] = [
      {
        icon: 'bi bi-eye',
        style: 'btn btn-outline-dark me-2',
        callback: (estimate) => this.navigateToEstimateView(estimate.id),
      },
      {
        icon: 'bi bi-pencil',
        style: 'btn btn-outline-dark me-2',
        callback: (estimate) => this.navigateToEstimateEdit(estimate.id),
      },
      {
        icon: 'bi bi-trash',
        style: 'btn btn-outline-danger me-2',
        callback: (estimate) => this.deleteEstimate(estimate.id),
        hasConfirmation: true,
        confirmationMessage: DELETE_MESSAGE,
      },
    ];

    return acoes;
  }
}
