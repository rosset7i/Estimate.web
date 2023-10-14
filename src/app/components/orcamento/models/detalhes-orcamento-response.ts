import { ProdutosNoOrcamentoResponse } from './produto-no-orcamento-response';

export class DetalhesOrcamentoResponse {
  id: string;
  nome: string;
  idFornecedor: string;
  produtosNoOrcamentoResponse: ProdutosNoOrcamentoResponse[];

  constructor(
    id: string,
    nome: string,
    idFornecedor: string,
    produtosNoOrcamentoResponse: ProdutosNoOrcamentoResponse[]
  ) {
    this.id = id;
    this.nome = nome;
    this.idFornecedor = idFornecedor;
    this.produtosNoOrcamentoResponse = produtosNoOrcamentoResponse;
  }
}
