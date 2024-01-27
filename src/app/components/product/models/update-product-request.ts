export class UpdateProductRequest {
  productId: string;
  name: string;

  constructor(productId: string, name: string) {
    this.productId = productId;
    this.name = name;
  }
}
