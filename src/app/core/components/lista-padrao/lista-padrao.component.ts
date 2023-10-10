import { Component, Input, OnInit } from '@angular/core';

import { OpcoesTabela } from '../../models/opcoes-tabela';
import { PaginadoOrdenadoRequest } from '../../models/paginado-ordenado-request';
import { Direcao } from '../../utils/direction';
import { Tamanhos } from '../../utils/tamanho-pagina';
import { MessageService } from '../../services/message.service';
import { DefinicaoActions } from '../../models/definicao-actions';
import { DefinicaoModal } from '../../models/modal-definicao';

@Component({
  selector: 'app-lista-padrao',
  templateUrl: './lista-padrao.component.html',
  styleUrls: ['./lista-padrao.component.css'],
})
export class ListaPadraoComponent implements OnInit {
  @Input() opcoesTabela: OpcoesTabela;

  tamanhoOpcoes = Tamanhos;
  tamanho: number = 10;
  paginalAtual: number = 1;
  direcaoOrdenacao: string = null;
  colunaOrdenacao: string = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.buscar();
    this.refreshTable();
  }

  onSort(coluna: string) {
    this.colunaOrdenacao = coluna;

    if (this.direcaoOrdenacao === Direcao.ASC) {
      this.direcaoOrdenacao = Direcao.DESC;
    } else {
      this.direcaoOrdenacao = Direcao.ASC;
    }

    this.buscar();
  }

  buscar() {
    const paginadoRequest = new PaginadoOrdenadoRequest(
      this.paginalAtual,
      this.tamanho,
      this.colunaOrdenacao,
      this.direcaoOrdenacao
    );

    this.opcoesTabela.getCallback(paginadoRequest);
  }

  chamarMetodo(acao: DefinicaoActions, item: any) {
    const modalDef = new DefinicaoModal(
      'Atenção!',
      acao.mensagemPersonalizada,
      true
    );

    if (acao.temConfirmacao)
      this.messageService.abrirModalComMensagem(modalDef).then((e) => {
        if (e) acao.callback(item);
      });
    else {
      acao.callback(item);
    }
  }

  refreshTable() {
    this.opcoesTabela.refresh.subscribe(() => this.buscar());
  }
}
