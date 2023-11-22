export class ModalDefinition {
  title: string;
  message: string;
  hasConfirmation: boolean;

  constructor(title: string, message: string, hasConfirmation: boolean) {
    this.title = title;
    this.message = message;
    this.hasConfirmation = hasConfirmation;
  }
}
