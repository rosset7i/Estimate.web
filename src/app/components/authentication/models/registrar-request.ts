export class RegisterRequest {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;

  constructor(
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
