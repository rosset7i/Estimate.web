export class ListAction {
  public text?: string;
  public icon?: string;
  public style?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public callback: (request: any) => void;
  public hasConfirmation?: boolean = false;
  public confirmationMessage?: string;
  public disabled?: boolean = false;
}
