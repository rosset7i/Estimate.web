import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DefinicaoTabela } from 'src/app/core/models/definicao-tabela';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { BuscarFornecedoresPaginadoRequest } from '../../fornecedor/models/fornecedor-paginado-request';
import { FornecedorResponse } from '../../fornecedor/models/fornecedor-response';
import { MessageService } from 'src/app/core/services/message.service';
import { DefinicaoModal } from 'src/app/core/models/modal-definicao';
import { DetalhesOrcamentoResponse } from '../models/detalhes-orcamento-response';
import { ProdutosNoOrcamentoResponse } from '../models/produto-no-orcamento-response';

@Component({
  selector: 'app-orcamento-detalhes',
  templateUrl: './orcamento-detalhes.component.html',
  styleUrls: ['./orcamento-detalhes.component.css'],
})
export class OrcamentoDetalhesComponent implements OnInit {
  form: FormGroup;
  orcamentoId: string;
  selecionado: string;
  produtosNoOrcamento: ProdutosNoOrcamentoResponse[];
  fornecedores: FornecedorResponse[];
  opcoes: DefinicaoTabela;
  desativado: boolean = false;
  searchFields = ['nome'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private fornecedorService: FornecedorService,
    private orcamentoService: OrcamentoService
  ) {}

  ngOnInit(): void {
    this.buscarFornecedores();
    this.buscarOrcamento();
    this.criarForm();
  }

  buscarOrcamento() {
    this.orcamentoId = this.activatedRoute.snapshot.params['orcamentoId'];
    if (this.orcamentoId) {
      this.orcamentoService
        .buscaDetalhesOrcamento(this.orcamentoId)
        .subscribe((e) => this.configurarForm(e));
    } else {
      this.produtosNoOrcamento = [];
    }
  }

  configurarForm(orcamentoDetalhes: DetalhesOrcamentoResponse) {
    this.form.get('nome').setValue(orcamentoDetalhes.nome);
    this.form.get('fornecedorId').setValue(orcamentoDetalhes.idFornecedor);
    this.selecionado = orcamentoDetalhes.nomeFornecedor;
    this.produtosNoOrcamento = orcamentoDetalhes.produtosNoOrcamentoResponse;

    if (this.router.url.includes('visualizar')) {
      this.form.disable();
      this.desativado = true;
    }
  }

  private criarForm() {
    this.form = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(75)]),
      ],
      fornecedorId: ['', Validators.required],
      produtosNoOrcamento: this.formBuilder.array([]),
    });
  }

  private buscarFornecedores() {
    const pagina = new PaginadoOrdenadoRequest(1, 10, null, null);
    const pagina2 = new BuscarFornecedoresPaginadoRequest(null, pagina);
    this.fornecedorService
      .buscaFornecedoresPaginado(pagina2)
      .subscribe((e) => (this.fornecedores = e.itens));
  }

  public selecionarFornecedor(fornecedor: FornecedorResponse) {
    this.form.markAsDirty();
    this.form.get('fornecedorId').setValue(fornecedor.id);
  }

  get canSave() {
    return this.form.valid && this.form.dirty;
  }

  salvar() {
    if (this.orcamentoId) {
      this.orcamentoService
        .atualizarOrcamento(this.orcamentoId, this.form.value)
        .subscribe(() => this.navegarParaTelaDeVisualizacao());
    } else {
      this.orcamentoService
        .criarOrcamento(this.form.value)
        .subscribe(() => this.navegarParaTelaDeVisualizacao());
    }
  }

  navegarParaTelaDeVisualizacao() {
    this.notificar();
    this.router.navigate(['/home/orcamentos']);
  }

  notificar() {
    this.messageService.abrirModalComMensagem(
      new DefinicaoModal('Sucesso!', null, false)
    );
  }
}
