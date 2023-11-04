import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AcaoDaTabela } from 'src/app/core/models/acao-da-tabela';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { DefinicaoTabela } from 'src/app/core/models/definicao-tabela';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoPaginadoRequest } from '../../produto/models/produto-paginado-request';
import { ProdutosNoOrcamentoResponse } from '../models/produto-no-orcamento-response';

@Component({
  selector: 'app-seletor-produtos',
  templateUrl: './seletor-produtos.component.html',
  styleUrls: ['./seletor-produtos.component.css'],
})
export class SeletorProdutosComponent implements OnInit {
  public opcoes: DefinicaoTabela;
  private parametro: string;
  private idsProdutosParaFiltrar: string[] = [];

  @Input() form: FormGroup;
  @Input() produtosSelecionados: ProdutosNoOrcamentoResponse[];
  @Input() desativado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService
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

  private buscar(paginadoRequest: ProdutoPaginadoRequest) {
    paginadoRequest.nome = this.parametro;
    paginadoRequest.idsDeProdutosParaFiltrar = this.idsProdutosParaFiltrar;

    this.produtoService
      .buscaProdutosPaginado(paginadoRequest)
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
