export class ProductsInEstimateResponse {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;

  constructor(id: string, name: string, quantity: number, unitPrice: number) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
