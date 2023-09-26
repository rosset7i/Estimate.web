import { PaginadoOrdenadoRequest } from '../../../core/models/paginado-ordenado-request';

export class BuscarFornecedoresPaginadoRequest extends PaginadoOrdenadoRequest {
  nome: string;

  constructor(nome: string, request: PaginadoOrdenadoRequest) {
    super(
      request.pagina,
      request.tamanhoDePagina,
      request.ordenarPor,
      request.ordem
    );
    this.nome = nome;
  }
}
