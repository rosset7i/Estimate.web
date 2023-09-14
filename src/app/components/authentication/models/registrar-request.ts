export class RegisterRequest {
  private name: string;
  private username: string;
  private email: string;
  private phone: string;
  private password: string;

  public constructor(
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
