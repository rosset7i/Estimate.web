import { ProdutosNoOrcamentoResponse } from './produto-no-orcamento-response';

export class DetalhesOrcamentoResponse {
  id: string;
  nome: string;
  nomeFornecedor: string;
  produtosNoOrcamentoResponse: ProdutosNoOrcamentoResponse[];

  constructor(
    id: string,
    nome: string,
    nomeFornecedor: string,
    produtosNoOrcamentoResponse: ProdutosNoOrcamentoResponse[]
  ) {
    this.id = id;
    this.nome = nome;
    this.nomeFornecedor = nomeFornecedor;
    this.produtosNoOrcamentoResponse = produtosNoOrcamentoResponse;
  }
}
