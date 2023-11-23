import { Component, OnInit } from '@angular/core';

import { AcaoDaTabela } from 'src/app/core/models/list-action';
import { DefinicaoColuna } from 'src/app/core/models/column-definition';
import { DefinicaoTabela } from 'src/app/core/models/list-definition';
import { EstimateService } from 'src/app/services/estimate.service';
import { UpdateEstimateRequest } from '../models/update-estimate-request';
import { PagedAndSortedEstimateRequest } from '../models/paged-and-sorted-estimate-request';
import { Router } from '@angular/router';
import { MENSAGEM_REMOVER } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css'],
})
export class EstimateListComponent implements OnInit {
  opcoes: DefinicaoTabela;
  parametro: string;

  constructor(
    private orcamentoService: EstimateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarOpcoes();
  }

  filtrar(nome: string) {
    this.parametro = nome;
    this.opcoes.refreshTable();
  }

  buscar(paginadoRequest: PagedAndSortedEstimateRequest) {
    paginadoRequest.name = this.parametro;

    this.orcamentoService
      .fetchPagedEstimates(paginadoRequest)
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
    atualizarOrcamento: UpdateEstimateRequest
  ) {
    this.orcamentoService
      .updateEstimate(orcamentoId, atualizarOrcamento)
      .subscribe(() => this.opcoes.refreshTable());
  }

  removerOrcamento(orcamentoId: string) {
    this.orcamentoService
      .deleteEstimate(orcamentoId)
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
