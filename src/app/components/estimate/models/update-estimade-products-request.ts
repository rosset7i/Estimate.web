export class InserirProdutoNoOrcamentoRequest {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;

  constructor(produtoId: string, quantidade: number, precoUnitario: number) {
    this.produtoId = produtoId;
    this.quantidade = quantidade;
    this.precoUnitario = precoUnitario;
  }
}
