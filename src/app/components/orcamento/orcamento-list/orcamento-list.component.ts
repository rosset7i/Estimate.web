import { Component, OnInit } from '@angular/core';
import { DefinicaoActions } from 'src/app/core/models/definicao-actions';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { AtualizarOrcamentoRequest } from '../models/atualizar-orcamento-request';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';

@Component({
  selector: 'app-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.css'],
})
export class OrcamentoListComponent implements OnInit {
  opcoes: OpcoesTabela;

  constructor(private orcamentoService: OrcamentoService) {}

  ngOnInit(): void {
    this.criarOpcoes();
  }

  buscar(paginadoRequest: PaginadoOrdenadoRequest) {
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
    const definicoes = [new DefinicaoColuna('Nome', 'nome', true)];

    return definicoes;
  }

  criarAcoes() {
    const acoes = [
      new DefinicaoActions(
        null,
        'bi bi-pencil',
        'btn btn-outline-dark me-2',
        (orcamentoId) =>
          this.editarOrcamento(
            orcamentoId,
            new AtualizarOrcamentoRequest('Teste')
          )
      ),
      new DefinicaoActions(
        null,
        'bi bi-trash',
        'btn btn-outline-danger me-2',
        (orcamentoId) => this.removerOrcamento(orcamentoId)
      ),
    ];

    return acoes;
  }
}
