import { Subject } from "rxjs";
import { DefinicaoActions } from "./definicao-actions";
import { DefinicaoColuna } from "./definicao-coluna";
import { ResultadoPaginadoDe } from "./resultado-paginado";

export class OpcoesTabela {
  nomeDaTabela: string;
  itensResponse: ResultadoPaginadoDe<any>;
  colunas: DefinicaoColuna[];
  acoes: DefinicaoActions[];
  getCallback: (any) => any;
  refresh = new Subject<void>;

  constructor(
    nomeDaTabela: string,
    colunas: DefinicaoColuna[],
    acoes: DefinicaoActions[],
    getCallback: (any) => any){
      this.nomeDaTabela = nomeDaTabela;
      this.colunas = colunas;
      this.acoes = acoes;
      this.getCallback = getCallback;
  }

  public refreshTable(){
    this.refresh.next();
  }

}
