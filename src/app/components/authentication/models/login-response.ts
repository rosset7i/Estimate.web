export class LoginResponse {
  public email: string;
  public token: string;

  public constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}
