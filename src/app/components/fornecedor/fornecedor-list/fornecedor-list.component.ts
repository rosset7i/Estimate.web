import { Component, OnInit } from '@angular/core';
import { DefinicaoActions } from 'src/app/core/models/definicao-actions';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { AtualizarFornecedorRequest } from '../models/atualizar-fornecedor-request';
import { BuscarFornecedoresPaginadoRequest } from '../models/fornecedor-paginado-request';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css'],
})
export class FornecedorListComponent implements OnInit {
  opcoes: OpcoesTabela;
  parametro: string;

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.construirOptions();
  }

  onFilter(nome: string) {
    this.parametro = nome;
    this.opcoes.refreshTable();
  }

  buscar(request: BuscarFornecedoresPaginadoRequest) {
    request.nome = this.parametro;

    this.fornecedorService
      .buscaFornecedoresPaginado(request)
      .subscribe((response) => {
        this.opcoes.itensResponse = response;
      });
  }

  atualizar(
    fornecedorId: string,
    atualizarFornecedorRequest: AtualizarFornecedorRequest
  ) {
    this.fornecedorService
      .atualizarFornecedor(fornecedorId, atualizarFornecedorRequest)
      .subscribe(() => this.opcoes.refreshTable());
  }

  remover(fornecedorId: string) {
    this.fornecedorService
      .removerFornecedor(fornecedorId)
      .subscribe(() => this.opcoes.refreshTable());
  }

  construirOptions() {
    this.opcoes = new OpcoesTabela(
      'Fornecedores',
      this.definicoesColuna(),
      this.definicoesActions(),
      (request) => this.buscar(request)
    );
  }

  definicoesColuna(): DefinicaoColuna[] {
    const definicoes = [new DefinicaoColuna('Nome', 'nome', true)];

    return definicoes;
  }

  definicoesActions(): DefinicaoActions[] {
    const definicoes = [
      new DefinicaoActions(
        null,
        'bi bi-pencil',
        'btn btn-outline-dark me-2',
        (fornecedorId) =>
          this.atualizar(fornecedorId, new AtualizarFornecedorRequest('Teste'))
      ),
      new DefinicaoActions(
        null,
        'bi bi-trash',
        'btn btn-outline-danger me-2',
        (fornecedorId) => this.remover(fornecedorId)
      ),
    ];

    return definicoes;
  }
}
