import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoPaginadoRequest } from '../../produto/models/produto-paginado-request';
import { DefinicaoActions } from 'src/app/core/models/definicao-actions';

@Component({
  selector: 'app-produto-picker',
  templateUrl: './produto-picker.component.html',
  styleUrls: ['./produto-picker.component.css'],
})
export class ProdutoPickerComponent implements OnInit {
  opcoes: OpcoesTabela;
  parametro: string;
  @Output() itemAdicionadoEmmiter = new EventEmitter<any>();

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.criarOpcoes();
  }

  adicionarProdutoNoOrçamento(itemSelecionado: any) {
    this.itemAdicionadoEmmiter.emit(itemSelecionado);
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
        'bi bi-plus',
        'btn btn-outline-success btn-sm',
        (produtoId: string) => this.adicionarProdutoNoOrçamento(produtoId),
        false,
        null
      ),
    ];

    return acoes;
  }
}
