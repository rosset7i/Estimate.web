import { Component, OnInit } from '@angular/core';

import { AcaoDaTabela } from 'src/app/core/models/list-action';
import { DefinicaoColuna } from 'src/app/core/models/column-definition';
import { DefinicaoTabela } from 'src/app/core/models/list-definition';
import { ProductService } from 'src/app/services/product.service';
import { UpdateProductRequest } from '../models/update-product-request';
import { PagedAndSortedProductRequest } from '../models/paged-and-sorted-product-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CreateProductRequest } from '../models/create-product-request';
import { MENSAGEM_REMOVER } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  opcoes: DefinicaoTabela;
  parametro: string;

  constructor(
    private produtoService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.criarOpcoes();
  }

  abrirModal(produtoId?: string) {
    const modalRef = this.modalService.open(ProductModalComponent);

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

  buscar(paginadoRequest: PagedAndSortedProductRequest) {
    paginadoRequest.name = this.parametro;

    this.produtoService
      .fetchPagedProducts(paginadoRequest)
      .subscribe((e) => (this.opcoes.itensResponse = e));
  }

  criarProduto(criarProduto: CreateProductRequest) {
    this.produtoService
      .createProduct(criarProduto)
      .subscribe(() => this.opcoes.refreshTable());
  }

  editarProduto(produtoId: string, atualizarProduto: UpdateProductRequest) {
    this.produtoService
      .updateProduct(produtoId, atualizarProduto)
      .subscribe(() => this.opcoes.refreshTable());
  }

  removerProduto(produtoId: string) {
    this.produtoService
      .deleteProduct(produtoId)
      .subscribe(() => this.opcoes.refreshTable());
  }

  criarOpcoes() {
    this.opcoes = new DefinicaoTabela(
      'Produtos',
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
    ];

    return definicoes;
  }

  criarAcoes() {
    const acoes: AcaoDaTabela[] = [
      {
        icone: 'bi bi-pencil',
        classePersonalizada: 'btn btn-outline-dark me-2',
        callback: (produto) => this.abrirModal(produto?.id),
      },
      {
        icone: 'bi bi-trash',
        classePersonalizada: 'btn btn-outline-danger me-2',
        callback: (produto) => this.removerProduto(produto.id),
        temConfirmacao: true,
        mensagemConfirmacao: MENSAGEM_REMOVER,
      },
    ];

    return acoes;
  }
}
