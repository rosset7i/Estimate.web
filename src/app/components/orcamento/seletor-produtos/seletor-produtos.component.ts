import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DefinicaoActions } from 'src/app/core/models/definicao-actions';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoPaginadoRequest } from '../../produto/models/produto-paginado-request';
import { ProdutosNoOrcamentoResponse } from '../models/produto-no-orcamento-response';

@Component({
  selector: 'app-seletor-produtos',
  templateUrl: './seletor-produtos.component.html',
  styleUrls: ['./seletor-produtos.component.css'],
})
export class SeletorProdutosComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() produtosSelecionados: ProdutosNoOrcamentoResponse[];
  @Input() desativado: boolean = false;
  public opcoes: OpcoesTabela;
  private parametro: string;
  private idsProdutosParaFiltrar: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.criarOpcoes();
    this.adicionarDados();
  }

  get rows(): FormArray {
    return this.form.get('produtosNoOrcamento') as FormArray;
  }

  private adicionarDados() {
    this.produtosSelecionados.forEach((e) => this.adicionarProduto(e));
  }

  private adicionarLinhaNoForm(produto: any) {
    const rowFormGroup = this.formBuilder.group({
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

    if (this.desativado) rowFormGroup.disable();

    this.rows.push(rowFormGroup);
  }

  public removerProduto(index: number) {
    this.form.markAsDirty();
    this.rows.removeAt(index);
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

  private buscar(paginadoRequest: ProdutoPaginadoRequest) {
    paginadoRequest.nome = this.parametro;
    paginadoRequest.idsDeProdutosParaFiltrar = this.idsProdutosParaFiltrar;

    this.produtoService
      .buscaProdutosPaginado(paginadoRequest)
      .subscribe((e) => (this.opcoes.itensResponse = e));
  }

  private criarOpcoes() {
    this.opcoes = new OpcoesTabela(
      'Produtos',
      this.criarColunas(),
      this.criarAcoes(),
      (request) => this.buscar(request)
    );
  }

  private criarColunas() {
    const definicoes = [new DefinicaoColuna('Nome', 'nome', true)];

    return definicoes;
  }

  private criarAcoes() {
    const acoes = [
      new DefinicaoActions(
        null,
        'bi bi-plus',
        'btn btn-outline-success btn-sm',
        (produtoId: string) => this.adicionarProduto(produtoId),
        false,
        null,
        this.desativado
      ),
    ];

    return acoes;
  }
}
