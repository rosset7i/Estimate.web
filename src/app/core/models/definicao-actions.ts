export class DefinicaoActions {
  nome: string | null;
  icone: string;
  bootstrapButtonClass: string;
  callback: (params) => any;

  constructor(
    nome: string,
    icone: string,
    bootstrap: string,
    callback: (params) => any){
    this.nome = nome;
    this.icone = icone;
    this.bootstrapButtonClass = bootstrap;
    this.callback = callback;
  }

}
