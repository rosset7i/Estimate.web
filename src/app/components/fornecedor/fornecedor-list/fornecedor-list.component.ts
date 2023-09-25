import { Component, OnInit } from '@angular/core';
import { FornecedorResponse } from '../models/fornecedor-response';
import { Tamanhos } from 'src/app/core/utils/tamanho-pagina';
import { Direcao } from 'src/app/core/utils/direction';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { DefinicaoActions } from 'src/app/core/models/definicao-actions';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {
  fornecedores: FornecedorResponse[] = [];
  tamanhoOpcoes = Tamanhos;
  totalItens: number;
  tamanho: number = 10;
  paginalAtual: number = 1;
  direcaoOrdenacao: string = null;
  colunaOrdenacao: string = null;

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.buscar();
  }

  onSort(coluna: string){
    this.colunaOrdenacao = coluna;

    if (this.direcaoOrdenacao == Direcao.ASC) {
      this.direcaoOrdenacao = Direcao.DESC;
    } else {
      this.direcaoOrdenacao = Direcao.ASC;
    }

    this.buscar();
  }

  buscar(paginaRecebida?: PaginadoOrdenadoRequest){
    this.fornecedorService.buscaFornecedoresPaginado(paginaRecebida)
      .subscribe(response => {
        this.totalItens = response.quantidadeDeItens;
        this.fornecedores = response.itens;
      });
  }

  definicoesColuna() : DefinicaoColuna[] {
    const definicoes = [
      new DefinicaoColuna('Nome', 'nome', true)
    ];

    return definicoes
  }

  definicoesActions() : DefinicaoActions[] {
    const definicoes = [
      new DefinicaoActions('', 'bi bi-trash', 'btn btn-outline-danger me-2'),
      new DefinicaoActions('', 'bi bi-pencil', 'btn btn-outline-dark me-2')
    ];

    return definicoes
  }
}
