import { ProductsInEstimateResponse } from './product-in-estimate-response';

export class EstimateDetailsResponse {
  id: string;
  name: string;
  supplierId: string;
  supplierName: string;
  productsInEstimate: ProductsInEstimateResponse[];

  constructor(
    id: string,
    name: string,
    supplierId: string,
    supplierName: string,
    productsInSupplier: ProductsInEstimateResponse[]
  ) {
    this.id = id;
    this.name = name;
    this.supplierId = supplierId;
    this.supplierName = supplierName;
    this.productsInEstimate = productsInSupplier;
  }
}
