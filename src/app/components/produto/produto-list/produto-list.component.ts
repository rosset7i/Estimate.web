import { Component, OnInit } from '@angular/core';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';
import { ProdutoService } from 'src/app/services/produto.service';
import { AtualizarProdutoRequest } from '../models/atualizar-produto-request';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { DefinicaoActions } from 'src/app/core/models/definicao-actions';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css'],
})
export class ProdutoListComponent implements OnInit {
  opcoes: OpcoesTabela;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.criarOpcoes();
  }

  buscar(paginadoRequest: PaginadoOrdenadoRequest) {
    this.produtoService
      .buscaProdutosPaginado(paginadoRequest)
      .subscribe((e) => (this.opcoes.itensResponse = e));
  }

  editarProduto(produtoId: string, atualizarProduto: AtualizarProdutoRequest) {
    this.produtoService
      .atualizarProduto(produtoId, atualizarProduto)
      .subscribe(() => this.opcoes.refreshTable());
  }

  removerProduto(produtoId: string) {
    this.produtoService
      .removerProduto(produtoId)
      .subscribe(() => this.opcoes.refreshTable());
  }

  criarOpcoes() {
    this.opcoes = new OpcoesTabela(
      'Produtos',
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
        (produtoId) =>
          this.editarProduto(produtoId, new AtualizarProdutoRequest('Teste'))
      ),
      new DefinicaoActions(
        null,
        'bi bi-trash',
        'btn btn-outline-danger me-2',
        (produtoId) => this.removerProduto(produtoId)
      ),
    ];

    return acoes;
  }
}