import { Subject } from 'rxjs';
import { AcaoDaTabela } from './acao-da-tabela';
import { DefinicaoColuna } from './definicao-coluna';
import { ResultadoPaginadoDe } from './resultado-paginado';

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
