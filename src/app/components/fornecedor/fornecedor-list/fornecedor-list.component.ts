import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AcaoDaTabela } from 'src/app/core/models/acao-da-tabela';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { DefinicaoTabela } from 'src/app/core/models/definicao-tabela';
import { SupplierService } from 'src/app/services/fornecedor.service';
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
  opcoes: DefinicaoTabela;
  parametro: string;

  constructor(
    private fornecedorService: SupplierService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.criarTabela();
  }

  abrirModal(fornecedorId?: string) {
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
      .fetchPagedSuppliers(request)
      .subscribe((response) => {
        this.opcoes.itensResponse = response;
      });
  }

  criarFornecedor(request: CriarFornecedorRequest) {
    this.fornecedorService
      .createSupplier(request)
      .subscribe(() => this.opcoes.refreshTable());
  }

  editarFornecedor(
    fornecedorId: string,
    atualizarFornecedorRequest: AtualizarFornecedorRequest
  ) {
    this.fornecedorService
      .updateSupplier(fornecedorId, atualizarFornecedorRequest)
      .subscribe(() => this.opcoes.refreshTable());
  }

  remover(fornecedorId: string) {
    this.fornecedorService
      .deleteSupplier(fornecedorId)
      .subscribe(() => this.opcoes.refreshTable());
  }

  criarTabela() {
    this.opcoes = new DefinicaoTabela(
      'Fornecedores',
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
    const definicoes: AcaoDaTabela[] = [
      {
        icone: 'bi bi-pencil',
        classePersonalizada: 'btn btn-outline-dark me-2',
        callback: (fornecedor) => this.abrirModal(fornecedor?.id),
      },
      {
        icone: 'bi bi-trash',
        classePersonalizada: 'btn btn-outline-danger me-2',
        callback: (fornecedor) => this.remover(fornecedor?.id),
        temConfirmacao: true,
        mensagemConfirmacao: MENSAGEM_REMOVER,
      },
    ];

    return definicoes;
  }
}
