export class PaginadoOrdenadoRequest {
  pagina: number;
  tamanhoDePagina: number;
  ordenarPor: string;
  ordem: string;

  constructor(
    pagina: number,
    tamanhoDePagina: number,
    ordenarPor: string,
    ordem: string){
    this.pagina = pagina;
    this.tamanhoDePagina = tamanhoDePagina;
    this.ordenarPor = ordenarPor;
    this.ordem = ordem;
  }

}
