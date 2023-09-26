import { Component, OnInit } from '@angular/core';
import { DefinicaoActions } from 'src/app/core/models/definicao-actions';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { ResultadoPaginadoDe } from 'src/app/core/models/resultado-paginado';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FornecedorResponse } from '../models/fornecedor-response';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';
import { AtualizarFornecedorRequest } from '../models/atualizar-fornecedor-request';
import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {
  fornecedores: ResultadoPaginadoDe<FornecedorResponse>;
  opcoes: OpcoesTabela;

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.opcoes = this.construirTabela();
  }

  buscar(request: PaginadoOrdenadoRequest){
    this.fornecedorService.buscaFornecedoresPaginado(request)
      .subscribe(response => {
        this.fornecedores = response;
      });
  }

  atualizar(
    fornecedorId: string,
    atualizarFornecedorRequest: AtualizarFornecedorRequest){
    this.fornecedorService.atualizarFornecedor(fornecedorId, atualizarFornecedorRequest)
      .subscribe();
  }

  remover(fornecedorId: string){
    this.fornecedorService.removerFornecedor(fornecedorId)
      .subscribe();
  }

  construirTabela(){
    return new OpcoesTabela(
      'Orçamentos',
      this.fornecedores,
      this.definicoesColuna(),
      this.definicoesActions());
  }

  definicoesColuna() : DefinicaoColuna[] {
    const definicoes = [
      new DefinicaoColuna('Nome', 'nome', true)
    ];

    return definicoes
  }

  definicoesActions() : DefinicaoActions[] {
    const definicoes = [
      new DefinicaoActions(
        null,
        'bi bi-pencil',
        'btn btn-outline-dark me-2',
        (fornecedorId) => this.atualizar(fornecedorId,  new AtualizarFornecedorRequest('Teste'))),
      new DefinicaoActions(
        null,
        'bi bi-trash',
        'btn btn-outline-danger me-2',
        (fornecedorId) => this.remover(fornecedorId))
    ];

    return definicoes
  }

}
