import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Api } from 'api';
import { PagedResultOf } from '../core/models/paged-result-of';
import { ServiceBase } from '../core/services/service-base.service';
import { PagedAndSortedEstimateRequest } from '../components/estimate/models/paged-and-sorted-estimate-request';
import { CreateEstimateRequest } from '../components/estimate/models/create-estimate-request';
import { EstimateDetailsResponse } from '../components/estimate/models/estimate-details-response';
import { EstimateResponse } from '../components/estimate/models/estimate-response';
import { UpdateEstimateRequest } from '../components/estimate/models/update-estimate-request';

@Injectable({
  providedIn: 'root',
})
export class EstimateService extends ServiceBase {
  public addProduct = new Subject<any>();
  public removeProduct = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    super();
  }

  private buildEstimateParams(request: PagedAndSortedEstimateRequest) {
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
  ): Observable<EstimateDetailsResponse> {
    return this.httpClient.get<EstimateDetailsResponse>(
      `${Api.ESTIMATE_API}/estimates/${estimateId}`
    );
  }

  public createEstimate(request: CreateEstimateRequest): Observable<any> {
    return this.httpClient.post(`${Api.ESTIMATE_API}/estimates`, request);
  }

  public updateEstimate(
    estimateId: string,
    request: UpdateEstimateRequest
  ): Observable<any> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/estimates/${estimateId}/update`,
      request
    );
  }

  public deleteEstimate(estimateId: string): Observable<any> {
    return this.httpClient.delete(
      `${Api.ESTIMATE_API}/estimates/${estimateId}/delete`
    );
  }
}
