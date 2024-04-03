export class UpdateProductRequest {
  private productId: string;
  private name: string;

  public constructor(productId: string, name: string) {
    this.productId = productId;
    this.name = name;
  }
}
