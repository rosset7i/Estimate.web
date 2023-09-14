export class UpdateSupplierRequest {
  private supplierId: string;
  private name: string;

  public constructor(supplierId: string, name: string) {
    this.supplierId = supplierId;
    this.name = name;
  }
}
