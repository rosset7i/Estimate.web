import { Subject } from 'rxjs';
import { AcaoDaTabela } from './list-action';
import { DefinicaoColuna } from './column-definition';
import { ResultadoPaginadoDe } from './paged-result-of';

export class DefinicaoTabela {
  nomeDaTabela: string;
  itensResponse: ResultadoPaginadoDe<any>;
  colunas: DefinicaoColuna[];
  acoes: AcaoDaTabela[];
  getCallback: Function;
  refresh = new Subject<void>();

  constructor(
    nomeDaTabela: string,
    colunas: DefinicaoColuna[],
    acoes: AcaoDaTabela[],
    getCallback: Function
  ) {
    this.nomeDaTabela = nomeDaTabela;
    this.colunas = colunas;
    this.acoes = acoes;
    this.getCallback = getCallback;
  }

  public refreshTable() {
    this.refresh.next();
  }
}
