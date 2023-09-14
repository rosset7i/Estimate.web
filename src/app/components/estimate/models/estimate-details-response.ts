import { ProductsInEstimateResponse } from './product-in-estimate-response';

export class EstimateDetailsResponse {
  public id: string;
  public name: string;
  public supplierId: string;
  public supplierName: string;
  public productsInEstimate: ProductsInEstimateResponse[];

  public constructor(
    id: string,
    name: string,
    supplierId: string,
    supplierName: string,
    productsInEstimate: ProductsInEstimateResponse[]
  ) {
    this.id = id;
    this.name = name;
    this.supplierId = supplierId;
    this.supplierName = supplierName;
    this.productsInEstimate = productsInEstimate;
  }
}
