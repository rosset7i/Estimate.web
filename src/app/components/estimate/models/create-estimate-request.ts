import { UpdateEstimateProductsRequest } from './update-estimate-products-request';

export class CreateEstimateRequest {
  name: string;
  supplierId: string;
  updateEstimateProducts: UpdateEstimateProductsRequest[];

  constructor(
    nome: string,
    supplier: string,
    updateEstimateProducts: UpdateEstimateProductsRequest[]
  ) {
    this.name = nome;
    this.supplierId = supplier;
    this.updateEstimateProducts = updateEstimateProducts;
  }
}
