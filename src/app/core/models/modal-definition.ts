export class ModalDefinition {
  public title: string;
  public message: string;
  public hasConfirmation: boolean;

  public constructor(title: string, message: string, hasConfirmation: boolean) {
    this.title = title;
    this.message = message;
    this.hasConfirmation = hasConfirmation;
  }
}
