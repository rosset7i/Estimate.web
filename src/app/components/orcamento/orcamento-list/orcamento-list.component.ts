import { Component, OnInit } from '@angular/core';

import { AcaoDaTabela } from 'src/app/core/models/acao-da-tabela';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { DefinicaoTabela } from 'src/app/core/models/definicao-tabela';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { AtualizarOrcamentoRequest } from '../models/atualizar-orcamento-request';
import { OrcamentoPaginadoRequest } from '../models/orcamento-paginado-request';
import { Router } from '@angular/router';
import { MENSAGEM_REMOVER } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.css'],
})
export class OrcamentoListComponent implements OnInit {
  opcoes: DefinicaoTabela;
  parametro: string;

  constructor(
    private orcamentoService: OrcamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarOpcoes();
  }

  filtrar(nome: string) {
    this.parametro = nome;
    this.opcoes.refreshTable();
  }

  buscar(paginadoRequest: OrcamentoPaginadoRequest) {
    paginadoRequest.nome = this.parametro;

    this.orcamentoService
      .buscaOrcamentosPaginado(paginadoRequest)
      .subscribe((e) => (this.opcoes.itensResponse = e));
  }

  navegarEdicaoOrcamento(orcamentoId: string) {
    this.router.navigate([`home/orcamentos/${orcamentoId}/editar`]);
  }

  navegarVisualizacaoOrcamento(orcamentoId: string) {
    this.router.navigate([`home/orcamentos/${orcamentoId}/visualizar`]);
  }

  editarOrcamento(
    orcamentoId: string,
    atualizarOrcamento: AtualizarOrcamentoRequest
  ) {
    this.orcamentoService
      .atualizarOrcamento(orcamentoId, atualizarOrcamento)
      .subscribe(() => this.opcoes.refreshTable());
  }

  removerOrcamento(orcamentoId: string) {
    this.orcamentoService
      .removerOrcamento(orcamentoId)
      .subscribe(() => this.opcoes.refreshTable());
  }

  criarOpcoes() {
    this.opcoes = new DefinicaoTabela(
      'Orçamentos',
      this.criarColunas(),
      this.criarAcoes(),
      (request) => this.buscar(request)
    );
  }

  criarColunas() {
    const definicoes: DefinicaoColuna[] = [
      {
        nome: 'Nome',
        mapearPara: 'nome',
        temSorting: true,
      },
      {
        nome: 'Fornecedor',
        mapearPara: 'nomeFornecedor',
        temSorting: false,
      },
    ];

    return definicoes;
  }

  criarAcoes() {
    const acoes: AcaoDaTabela[] = [
      {
        icone: 'bi bi-eye',
        classePersonalizada: 'btn btn-outline-dark me-2',
        callback: (orcamento) =>
          this.navegarVisualizacaoOrcamento(orcamento.id),
      },
      {
        icone: 'bi bi-pencil',
        classePersonalizada: 'btn btn-outline-dark me-2',
        callback: (orcamento) => this.navegarEdicaoOrcamento(orcamento.id),
      },
      {
        icone: 'bi bi-trash',
        classePersonalizada: 'btn btn-outline-danger me-2',
        callback: (orcamento) => this.removerOrcamento(orcamento.id),
        temConfirmacao: true,
        mensagemConfirmacao: MENSAGEM_REMOVER,
      },
    ];

    return acoes;
  }
}
