export class ProductsInEstimateResponse {
  public id: string;
  public name: string;
  public unitPrice: number;
  public quantity: number;

  public constructor(
    id: string,
    name: string,
    quantity: number,
    unitPrice: number
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
