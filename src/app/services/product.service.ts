import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PagedResultOf } from '../core/models/paged-result-of';
import { Api } from 'api';
import { ServiceBase } from '../core/services/service-base.service';
import { CreateProductRequest } from '../components/product/models/create-product-request';
import { PagedAndSortedProductRequest } from '../components/product/models/paged-and-sorted-product-request';
import { ProductResponse } from '../components/product/models/product-response';
import { UpdateProductRequest } from '../components/product/models/update-product-request';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ServiceBase {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private buildProductParams(request: PagedAndSortedProductRequest) {
    let params = this.buildParams(request);
    if (request.name) params = params.append('name', request.name);
    if (request.productIdsToFilter)
      request.productIdsToFilter.forEach(
        (e) => (params = params.append('productIdsToFilter', e))
      );

    return params;
  }

  public fetchPagedProducts(
    request: PagedAndSortedProductRequest
  ): Observable<PagedResultOf<ProductResponse>> {
    return this.httpClient.get<PagedResultOf<ProductResponse>>(
      `${Api.ESTIMATE_API}/products`,
      { params: this.buildProductParams(request) }
    );
  }

  public fetchProductDetails(productId: string): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(
      `${Api.ESTIMATE_API}/products/${productId}`
    );
  }

  public createProduct(request: CreateProductRequest): Observable<any> {
    return this.httpClient.post(`${Api.ESTIMATE_API}/products`, request);
  }

  public updateProduct(
    productId: string,
    request: UpdateProductRequest
  ): Observable<any> {
    return this.httpClient.put(
      `${Api.ESTIMATE_API}/products/${productId}/update`,
      request
    );
  }

  public deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete(
      `${Api.ESTIMATE_API}/products/${productId}/delete`
    );
  }
}
