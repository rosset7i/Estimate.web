import { Component, OnInit } from '@angular/core';

import { ListAction } from 'src/app/core/models/list-action';
import { ColumnDefinition } from 'src/app/core/models/column-definition';
import { ListDefinition } from 'src/app/core/models/list-definition';
import { EstimateService } from 'src/app/services/estimate.service';
import { PagedAndSortedEstimateRequest } from '../models/paged-and-sorted-estimate-request';
import { Router } from '@angular/router';
import { DELETE_MESSAGE } from 'src/app/core/utils/const';
import { EstimateResponse } from '../models/estimate-response';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css'],
})
export class EstimateListComponent implements OnInit {
  public listDefinition: ListDefinition;
  private param: string;

  public constructor(
    private estimateService: EstimateService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.createList();
  }

  public filter(name: string): void {
    this.param = name;
    this.listDefinition.refreshTable();
  }

  private fetch(request: PagedAndSortedEstimateRequest): void {
    request.name = this.param;

    this.estimateService
      .fetchPagedEstimates(request)
      .subscribe((e) => (this.listDefinition.items = e));
  }

  private async navigateToEstimateEdit(estimateId: string): Promise<void> {
    await this.router.navigate([`home/estimates/${estimateId}/edit`]);
  }

  private async navigateToEstimateView(estimateId: string): Promise<void> {
    await this.router.navigate([`home/estimates/${estimateId}/view`]);
  }

  private deleteEstimate(estimateId: string): void {
    this.estimateService
      .deleteEstimate(estimateId)
      .subscribe(() => this.listDefinition.refreshTable());
  }

  private createList(): void {
    this.listDefinition = new ListDefinition(
      'Estimates',
      this.createColumns(),
      this.createActions(),
      (request: PagedAndSortedEstimateRequest) => this.fetch(request)
    );
  }

  private createColumns(): ColumnDefinition[] {
    const definitions: ColumnDefinition[] = [
      {
        name: 'Name',
        mapFrom: 'name',
        hasSorting: true,
      },
      {
        name: 'Supplier',
        mapFrom: 'supplierName',
        hasSorting: true,
      },
    ];

    return definitions;
  }

  private createActions(): ListAction[] {
    const actions: ListAction[] = [
      {
        icon: 'bi bi-eye',
        style: 'btn btn-outline-dark me-2',
        callback: (estimate: EstimateResponse) =>
          this.navigateToEstimateView(estimate.id),
      },
      {
        icon: 'bi bi-pencil',
        style: 'btn btn-outline-dark me-2',
        callback: (estimate: EstimateResponse) =>
          this.navigateToEstimateEdit(estimate.id),
      },
      {
        icon: 'bi bi-trash',
        style: 'btn btn-outline-danger me-2',
        callback: (estimate: EstimateResponse) =>
          this.deleteEstimate(estimate.id),
        hasConfirmation: true,
        confirmationMessage: DELETE_MESSAGE,
      },
    ];

    return actions;
  }
}
