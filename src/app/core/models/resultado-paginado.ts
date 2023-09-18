export class ResultadoPaginadoDe<TResponse> {
  quantidadeDePaginas: number;
  paginaAtual: number;
  itens: TResponse[];

  constructor(
    quantidadeDePaginas: number,
    paginaAtual: number,
    itens: TResponse[]){
    this.quantidadeDePaginas = quantidadeDePaginas;
    this.paginaAtual = paginaAtual;
    this.itens = itens;
  }

}
