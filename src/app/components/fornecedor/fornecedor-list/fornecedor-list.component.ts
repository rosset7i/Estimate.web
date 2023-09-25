import { Component, OnInit, OnChanges } from '@angular/core';
import { FornecedorResponse } from '../models/fornecedor-response';
import { Tamanhos } from 'src/app/core/utils/tamanho-pagina';
import { Direcao } from 'src/app/core/utils/direction';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';
import { FornecedorService } from 'src/app/services/fornecedor.service';

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

  buscar(){
    const pagina = new PaginadoOrdenadoRequest(
      this.paginalAtual,
      this.tamanho,
      this.colunaOrdenacao,
      this.direcaoOrdenacao);

    this.fornecedorService.buscaFornecedoresPaginado(pagina)
      .subscribe(response => {
        this.totalItens = response.quantidadeDeItens;
        this.fornecedores = response.itens;
      });
  }
}
