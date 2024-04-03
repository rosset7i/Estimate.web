export class UpdateEstimateProductsRequest {
  private productId: string;
  private quantity: number;
  private unitPrice: number;

  public constructor(productId: string, quantity: number, unitPrice: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
