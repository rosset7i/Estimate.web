import { UpdateEstimateProductsRequest } from './update-estimate-products-request';

export class CreateEstimateRequest {
  private name: string;
  private supplierId: string;
  public updateEstimateProducts: UpdateEstimateProductsRequest[];

  public constructor(
    nome: string,
    supplier: string,
    updateEstimateProducts: UpdateEstimateProductsRequest[]
  ) {
    this.name = nome;
    this.supplierId = supplier;
    this.updateEstimateProducts = updateEstimateProducts;
  }
}
