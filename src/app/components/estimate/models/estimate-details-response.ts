import { ProdutosNoOrcamentoResponse } from './product-in-estimate-response';

export class DetalhesOrcamentoResponse {
  id: string;
  nome: string;
  idFornecedor: string;
  nomeFornecedor: string;
  produtosNoOrcamentoResponse: ProdutosNoOrcamentoResponse[];

  constructor(
    id: string,
    nome: string,
    idFornecedor: string,
    nomeFornecedor: string,
    produtosNoOrcamentoResponse: ProdutosNoOrcamentoResponse[]
  ) {
    this.id = id;
    this.nome = nome;
    this.idFornecedor = idFornecedor;
    this.nomeFornecedor = nomeFornecedor;
    this.produtosNoOrcamentoResponse = produtosNoOrcamentoResponse;
  }
}
