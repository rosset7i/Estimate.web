import { PaginadoOrdenadoRequest } from '../../../core/models/paginado-ordenado-request';

export class OrcamentoPaginadoRequest extends PaginadoOrdenadoRequest {
  nome: string;
  fornecedorId: string;

  constructor(
    nome: string,
    fornecedorId: string,
    request: PaginadoOrdenadoRequest
  ) {
    super(
      request.pagina,
      request.tamanhoDePagina,
      request.ordenarPor,
      request.ordem
    );
    this.nome = nome;
    this.fornecedorId = fornecedorId;
  }
}
