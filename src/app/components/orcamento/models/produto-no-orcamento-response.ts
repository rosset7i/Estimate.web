export class ProdutosNoOrcamentoResponse {
  id: string;
  nome: string;
  precoUnitario: number;
  quantidade: number;

  constructor(
    id: string,
    nome: string,
    quantidade: number,
    precoUnitario: number){
    this.id = id;
    this.nome = nome;
    this.quantidade = quantidade;
    this.precoUnitario = precoUnitario;
  }

}
