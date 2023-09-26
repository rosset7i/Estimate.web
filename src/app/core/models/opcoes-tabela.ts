import { Subject } from "rxjs";
import { DefinicaoActions } from "./definicao-actions";
import { DefinicaoColuna } from "./definicao-coluna";
import { ResultadoPaginadoDe } from "./resultado-paginado";

export class OpcoesTabela {
  nomeDaTabela: string;
  itensResponse: ResultadoPaginadoDe<any>;
  colunas: DefinicaoColuna[];
  acoes: DefinicaoActions[];
  refreshTable = new Subject;

  constructor(
    nomeDaTabela: string,
    itensResponse: ResultadoPaginadoDe<any>,
    colunas: DefinicaoColuna[],
    acoes: DefinicaoActions[]){
      this.nomeDaTabela = nomeDaTabela;
      this.itensResponse = itensResponse;
      this.colunas = colunas;
      this.acoes = acoes;
  }

}
