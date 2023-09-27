export class DefinicaoColuna {
  nome: string;
  mapearPara: string;
  tamanho: number;
  temSorting: boolean = false;

  constructor(nome: string, mapearPara: string, temSorting: boolean) {
    this.nome = nome;
    this.mapearPara = mapearPara;
    this.temSorting = temSorting;
  }
}
