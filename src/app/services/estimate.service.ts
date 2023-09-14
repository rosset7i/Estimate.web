import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from 'api';
import { PagedResultOf } from '../core/models/paged-result-of';
import { ServiceBase } from '../core/services/service-base.service';
import { PagedAndSortedEstimateRequest } from '../components/estimate/models/paged-and-sorted-estimate-request';
import { CreateEstimateRequest } from '../components/estimate/models/create-estimate-request';
import { EstimateDetailsResponse } from '../components/estimate/models/estimate-details-response';
import { EstimateResponse } from '../components/estimate/models/estimate-response';
import { UpdateEstimateRequest } from '../components/estimate/models/update-estimate-request';
import { ResultOf } from '../core/models/result-of';
import { UpdateEstimateProductsRequest } from '../components/estimate/models/update-estimate-products-request';

@Injectable({
  providedIn: 'root',
})
export class EstimateService extends ServiceBase {

  public constructor(private httpClient: HttpClient) {
    super();
  }

  private buildEstimateParams(request: PagedAndSortedEstimateRequest): HttpParams {
    let params = this.buildParams(request);
    if (request.name) params = params.append('name', request.name);
    if (request.supplierId)
      params = params.append('supplierId', request.supplierId);

    return params;
  }

  public fetchPagedEstimates(
    request: PagedAndSortedEstimateRequest
  ): Observable<PagedResultOf<EstimateResponse>> {
    return this.httpClient.get<PagedResultOf<EstimateResponse>>(
      `${Api.ESTIMATE_API}/estimates`,
      { params: this.buildEstimateParams(request) }
    );
  }

  public fetchEstimateDetails(
    estimateId: string
  ): Observable<ResultOf<EstimateDetailsResponse>> {
    return this.httpClient.get<ResultOf<EstimateDetailsResponse>>(
      `${Api.ESTIMATE_API}/estimates/fetch-details?estimateId=${estimateId}`
    );
  }

  public createEstimate(request: CreateEstimateRequest): Observable<unknown> {
    return this.httpClient.post(`${Api.ESTIMATE_API}/estimates`, request);
  }

  public updateEstimate(
    request: UpdateEstimateRequest
  ): Observable<unknown> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/estimates`,
      request
    );
  }

  public updateEstimateProducts(
    request: UpdateEstimateProductsRequest
  ): Observable<unknown> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/estimates/update-products`,
      request
    );
  }

  public deleteEstimate(estimateId: string): Observable<unknown> {
    return this.httpClient.delete(
      `${Api.ESTIMATE_API}/estimates?estimateId=${estimateId}`
    );
  }
}
