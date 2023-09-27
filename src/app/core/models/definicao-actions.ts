export class DefinicaoActions {
  nome: string | null;
  icone: string;
  bootstrapButtonClass: string;
  callback: Function;

  constructor(
    nome: string,
    icone: string,
    bootstrap: string,
    callback: Function
  ) {
    this.nome = nome;
    this.icone = icone;
    this.bootstrapButtonClass = bootstrap;
    this.callback = callback;
  }
}
