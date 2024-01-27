export class UpdateSupplierRequest {
  supplierId: string;
  name: string;

  constructor(supplierId: string, name: string) {
    this.supplierId = supplierId;
    this.name = name;
  }
}
