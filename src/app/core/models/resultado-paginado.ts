export class ResultadoPaginadoDe<TResponse> {
  quantidadeDePaginas: number;
  quantidadeDeItens: number;
  paginaAtual: number;
  itens: TResponse[];

  constructor(
    quantidadeDePaginas: number,
    quantidadeDeItens: number,
    paginaAtual: number,
    itens: TResponse[]){
    this.quantidadeDePaginas = quantidadeDePaginas;
    this.quantidadeDeItens = quantidadeDeItens;
    this.paginaAtual = paginaAtual;
    this.itens = itens;
  }

}
