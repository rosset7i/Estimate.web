import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AcaoDaTabela } from 'src/app/core/models/list-action';
import { DefinicaoColuna } from 'src/app/core/models/column-definition';
import { DefinicaoTabela } from 'src/app/core/models/list-definition';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierModalComponent } from '../supplier-modal/supplier-modal.component';
import { UpdateSupplierRequest } from '../models/update-supplier-request';
import { CreateSupplierRequest } from '../models/create-supplier-request';
import { PagedAndSortedSupplierRequest } from '../models/paged-and-sorted-supplier-request';
import { MENSAGEM_REMOVER } from 'src/app/core/utils/consts';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements OnInit {
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
    const modalRef = this.modalService.open(SupplierModalComponent);

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

  buscar(request: PagedAndSortedSupplierRequest) {
    request.name = this.parametro;

    this.fornecedorService
      .fetchPagedSuppliers(request)
      .subscribe((response) => {
        this.opcoes.itensResponse = response;
      });
  }

  criarFornecedor(request: CreateSupplierRequest) {
    this.fornecedorService
      .createSupplier(request)
      .subscribe(() => this.opcoes.refreshTable());
  }

  editarFornecedor(
    fornecedorId: string,
    atualizarFornecedorRequest: UpdateSupplierRequest
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
