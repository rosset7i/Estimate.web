import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from 'api';
import { PagedResultOf } from '../core/models/paged-result-of';
import { ServiceBase } from '../core/services/service-base.service';
import { SupplierResponse } from '../components/supplier/models/supplier-response';
import { PagedAndSortedSupplierRequest } from '../components/supplier/models/paged-and-sorted-supplier-request';
import { CreateSupplierRequest } from '../components/supplier/models/create-supplier-request';
import { UpdateSupplierRequest } from '../components/supplier/models/update-supplier-request';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends ServiceBase {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private buildSupplierParams(request: PagedAndSortedSupplierRequest) {
    let params = this.buildParams(request);
    if (request.name) params = params.append('name', request.name);

    return params;
  }

  public fetchPagedSuppliers(
    request?: PagedAndSortedSupplierRequest
  ): Observable<PagedResultOf<SupplierResponse>> {
    return this.httpClient.get<PagedResultOf<SupplierResponse>>(
      `${Api.ESTIMATE_API}/suppliers`,
      { params: this.buildSupplierParams(request) }
    );
  }

  public fetchSupplierDetails(
    supplierId?: string
  ): Observable<SupplierResponse> {
    return this.httpClient.get<SupplierResponse>(
      `${Api.ESTIMATE_API}/suppliers/${supplierId}`
    );
  }

  public createSupplier(request: CreateSupplierRequest): Observable<any> {
    return this.httpClient.post(`${Api.ESTIMATE_API}/suppliers`, request);
  }

  public updateSupplier(
    supplierId: string,
    request: UpdateSupplierRequest
  ): Observable<any> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/suppliers/${supplierId}/update`,
      request
    );
  }

  public deleteSupplier(supplierId: string): Observable<any> {
    return this.httpClient.delete(
      `${Api.ESTIMATE_API}/suppliers/${supplierId}/delete`
    );
  }
}
