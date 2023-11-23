import { InserirProdutoNoOrcamentoRequest } from './update-estimade-products-request';

export class CriarOrcamentoRequest {
  nome: string;
  fornecedorDoOrcamentoId: string;
  produtosParaInserirNoOrcamento: InserirProdutoNoOrcamentoRequest[];

  constructor(
    nome: string,
    fornecedorDoOrcamentoId: string,
    produtosParaInserirNoOrcamento: InserirProdutoNoOrcamentoRequest[]
  ) {
    this.nome = nome;
    this.fornecedorDoOrcamentoId = fornecedorDoOrcamentoId;
    this.produtosParaInserirNoOrcamento = produtosParaInserirNoOrcamento;
  }
}
