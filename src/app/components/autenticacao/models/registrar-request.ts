export class RegistrarRequest {
  nome: string;
  username: string;
  email: string;
  telefone: string;
  senha: string;

  constructor(
    nome: string,
    username: string,
    email: string,
    telefone: string,
    senha: string){
    this.nome = nome;
    this.username = username;
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;
  }
}
