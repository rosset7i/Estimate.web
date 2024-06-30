import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PagedAndSortedRequest } from '../models/paged-and-sorted-request';
import { Direction } from '../utils/direction';

@Injectable({
  providedIn: 'root',
})
export class ServiceBase {
  protected buildParams(
    pagedAndSortedRequest: PagedAndSortedRequest
  ): HttpParams {
    if (pagedAndSortedRequest.direction == null) {
      pagedAndSortedRequest.direction = Direction.ASC
    }

    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', pagedAndSortedRequest.page);
    queryParams = queryParams.append(
      'pageSize',
      pagedAndSortedRequest.pageSize
    );
    queryParams = queryParams.append('sortBy', pagedAndSortedRequest.sortBy);
    queryParams = queryParams.append(
      'direction',
      pagedAndSortedRequest.direction
    );

    return queryParams;
  }
}
