export class DefinicaoModal {
  title: string;
  mensagem: string;
  modalDeConfirmacao: boolean;

  constructor(title: string, mensagem: string, modalDeConfirmacao: boolean) {
    this.title = title;
    this.mensagem = mensagem;
    this.modalDeConfirmacao = modalDeConfirmacao;
  }
}
