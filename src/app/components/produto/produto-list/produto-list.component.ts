import { Component, OnInit } from '@angular/core';

import { DefinicaoActions } from 'src/app/core/models/definicao-actions';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { ProdutoService } from 'src/app/services/produto.service';
import { AtualizarProdutoRequest } from '../models/atualizar-produto-request';
import { ProdutoPaginadoRequest } from '../models/produto-paginado-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoModalComponent } from '../produto-modal/produto-modal.component';
import { CriarProdutoRequest } from '../models/criar-produto-request';
import { MENSAGEM_REMOVER } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css'],
})
export class ProdutoListComponent implements OnInit {
  opcoes: OpcoesTabela;
  parametro: string;

  constructor(
    private produtoService: ProdutoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.criarOpcoes();
  }

  openModal(produtoId?: string) {
    const modalRef = this.modalService.open(ProdutoModalComponent);

    modalRef.componentInstance.produtoId = produtoId;

    modalRef.result.then((e) => {
      if (e && !produtoId) this.criarProduto(e);
      if (e && produtoId) this.editarProduto(produtoId, e);
    });
  }

  filtrar(nome: string) {
    this.parametro = nome;
    this.opcoes.refreshTable();
  }

  buscar(paginadoRequest: ProdutoPaginadoRequest) {
    paginadoRequest.nome = this.parametro;

    this.produtoService
      .buscaProdutosPaginado(paginadoRequest)
      .subscribe((e) => (this.opcoes.itensResponse = e));
  }

  criarProduto(criarProduto: CriarProdutoRequest) {
    this.produtoService
      .criarProduto(criarProduto)
      .subscribe(() => this.opcoes.refreshTable());
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
        (produto) => this.openModal(produto?.id),
        false,
        null,
        false
      ),
      new DefinicaoActions(
        null,
        'bi bi-trash',
        'btn btn-outline-danger me-2',
        (produto) => this.removerProduto(produto.id),
        true,
        MENSAGEM_REMOVER,
        false
      ),
    ];

    return acoes;
  }
}
