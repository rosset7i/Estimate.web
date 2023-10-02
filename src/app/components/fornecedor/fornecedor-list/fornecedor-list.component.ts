import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DefinicaoActions } from 'src/app/core/models/definicao-actions';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FornecedorModalComponent } from '../fornecedor-modal/fornecedor-modal.component';
import { AtualizarFornecedorRequest } from '../models/atualizar-fornecedor-request';
import { CriarFornecedorRequest } from '../models/criar-fornecedor-request';
import { BuscarFornecedoresPaginadoRequest } from '../models/fornecedor-paginado-request';
import { MENSAGEM_REMOVER } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css'],
})
export class FornecedorListComponent implements OnInit {
  opcoes: OpcoesTabela;
  parametro: string;

  constructor(
    private fornecedorService: FornecedorService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.construirOptions();
  }

  openModal(fornecedorId?: string) {
    const modalRef = this.modalService.open(FornecedorModalComponent);

    modalRef.componentInstance.fornecedorId = fornecedorId;

    modalRef.result.then((e) => {
      if (e && !fornecedorId) this.criarFornecedor(e);
      if (e && fornecedorId) this.editarFornecedor(fornecedorId, e);
    });
  }

  filtrar(nome: string) {
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

  criarFornecedor(request: CriarFornecedorRequest) {
    this.fornecedorService
      .criarFornecedor(request)
      .subscribe(() => this.opcoes.refreshTable());
  }

  editarFornecedor(
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
    const definicoes: DefinicaoActions[] = [
      new DefinicaoActions(
        null,
        'bi bi-pencil',
        'btn btn-outline-dark me-2',
        (fornecedor) => this.openModal(fornecedor?.id),
        false,
        null
      ),
      new DefinicaoActions(
        null,
        'bi bi-trash',
        'btn btn-outline-danger me-2',
        (fornecedor) => this.remover(fornecedor?.id),
        true,
        MENSAGEM_REMOVER
      ),
    ];

    return definicoes;
  }
}
