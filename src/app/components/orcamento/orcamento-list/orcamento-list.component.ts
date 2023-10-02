import { Component, OnInit } from '@angular/core';

import { DefinicaoActions } from 'src/app/core/models/definicao-actions';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { AtualizarOrcamentoRequest } from '../models/atualizar-orcamento-request';
import { OrcamentoPaginadoRequest } from '../models/orcamento-paginado-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.css'],
})
export class OrcamentoListComponent implements OnInit {
  opcoes: OpcoesTabela;
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
    this.opcoes = new OpcoesTabela(
      'Orçamentos',
      this.criarColunas(),
      this.criarAcoes(),
      (request) => this.buscar(request)
    );
  }

  criarColunas() {
    const definicoes = [
      new DefinicaoColuna('Nome', 'nome', true),
      new DefinicaoColuna('Fornecedor', 'nomeFornecedor', false),
    ];

    return definicoes;
  }

  criarAcoes() {
    const acoes = [
      new DefinicaoActions(
        null,
        'bi bi-pencil',
        'btn btn-outline-dark me-2',
        null
      ),
      new DefinicaoActions(
        null,
        'bi bi-trash',
        'btn btn-outline-danger me-2',
        (orcamento) => this.removerOrcamento(orcamento.id)
      ),
    ];

    return acoes;
  }
}
