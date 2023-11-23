import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AcaoDaTabela } from 'src/app/core/models/list-action';
import { DefinicaoColuna } from 'src/app/core/models/column-definition';
import { DefinicaoTabela } from 'src/app/core/models/list-definition';
import { ProductService } from 'src/app/services/product.service';
import { ProdutosNoOrcamentoResponse } from '../models/product-in-estimate-response';
import { PagedAndSortedProductRequest } from '../../product/models/paged-and-sorted-product-request';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css'],
})
export class ProdutSelectComponent implements OnInit {
  public opcoes: DefinicaoTabela;
  private parametro: string;
  private idsProdutosParaFiltrar: string[] = [];

  @Input() form: FormGroup;
  @Input() produtosSelecionados: ProdutosNoOrcamentoResponse[];
  @Input() desativado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProductService
  ) {}

  ngOnInit(): void {
    this.criarOpcoes();
    this.mapearDados();
  }

  get linhas() {
    return this.form.get('produtosNoOrcamento') as FormArray;
  }

  private mapearDados() {
    this.produtosSelecionados.forEach((e) => this.adicionarProduto(e));
  }

  private adicionarLinhaNoForm(produto: any) {
    const linhaDoForm = this.formBuilder.group({
      produtoId: [produto.id, Validators.required],
      nome: [
        {
          value: produto.nome,
          disabled: true,
        },
      ],
      quantidade: [
        produto.quantidade,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      precoUnitario: [
        produto.precoUnitario,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });

    if (this.desativado) linhaDoForm.disable();

    this.linhas.push(linhaDoForm);
  }

  public removerProduto(index: number) {
    this.form.markAsDirty();
    this.linhas.removeAt(index);
    this.idsProdutosParaFiltrar.splice(index, 1);
    this.opcoes.refreshTable();
  }

  public adicionarProduto(produtoSelecionado: any) {
    this.adicionarLinhaNoForm(produtoSelecionado);
    this.idsProdutosParaFiltrar.push(produtoSelecionado.id);
    this.opcoes.refreshTable();
  }

  public filtrar(nome: string) {
    this.parametro = nome;
    this.opcoes.refreshTable();
  }

  private buscar(paginadoRequest: PagedAndSortedProductRequest) {
    paginadoRequest.name = this.parametro;
    paginadoRequest.productIdsToFilter = this.idsProdutosParaFiltrar;

    this.produtoService
      .fetchPagedProducts(paginadoRequest)
      .subscribe((e) => (this.opcoes.itensResponse = e));
  }

  private criarOpcoes() {
    this.opcoes = new DefinicaoTabela(
      'Produtos',
      this.criarColunas(),
      this.criarAcoes(),
      (request) => this.buscar(request)
    );
  }

  private criarColunas() {
    const definicoes: DefinicaoColuna[] = [
      {
        nome: 'Nome',
        mapearPara: 'nome',
        temSorting: true,
      },
    ];

    return definicoes;
  }

  private criarAcoes() {
    const acoes: AcaoDaTabela[] = [
      {
        icone: 'bi bi-plus',
        classePersonalizada: 'btn btn-outline-success btn-sm',
        callback: (produtoId: string) => this.adicionarProduto(produtoId),
        desativado: this.desativado,
      },
    ];

    return acoes;
  }
}
