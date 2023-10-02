export class DefinicaoActions {
  nome: string | null;
  icone: string;
  bootstrapButtonClass: string;
  callback: Function;
  temConfirmacao: boolean;
  mensagemPersonalizada: string;

  constructor(
    nome: string,
    icone: string,
    bootstrap: string,
    callback: Function,
    temConfirmacao: boolean,
    mensagemPersonalizada: string
  ) {
    this.nome = nome;
    this.icone = icone;
    this.bootstrapButtonClass = bootstrap;
    this.callback = callback;
    this.temConfirmacao = temConfirmacao;
    this.mensagemPersonalizada = mensagemPersonalizada;
  }
}
