export class ListAction {
  text?: string;
  icon?: string;
  style?: string;
  callback: Function;
  hasConfirmation?: boolean = false;
  confirmationMessage?: string;
  disabled?: boolean = false;
}
