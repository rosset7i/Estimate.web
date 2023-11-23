export class UpdateEstimateProductsRequest {
  productId: string;
  quantity: number;
  unitPrice: number;

  constructor(productId: string, quantity: number, unitPrice: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
