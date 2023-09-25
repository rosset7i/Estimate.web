export class DefinicaoActions {
  nome: string | null;
  icone: string;
  bootstrapButtonClass: string;

  constructor(
    nome: string,
    icone: string,
    bootstrap: string,){
    this.nome = nome;
    this.icone = icone;
    this.bootstrapButtonClass = bootstrap;
  }

}
