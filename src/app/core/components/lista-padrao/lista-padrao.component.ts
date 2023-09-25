import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Tamanhos } from '../../utils/tamanho-pagina';
import { Direcao } from '../../utils/direction';
import { PaginadoOrdenadoRequest } from '../../models/paginado-ordenado-request';
import { DefinicaoColuna } from '../../models/definicao-coluna';
import { DefinicaoActions } from '../../models/definicao-actions';

@Component({
  selector: 'app-lista-padrao',
  templateUrl: './lista-padrao.component.html',
  styleUrls: ['./lista-padrao.component.css']
})
export class ListaPadraoComponent implements OnInit {
  @Input() itens: any[] = [];
  @Input() definicoes: DefinicaoColuna[] = [];
  @Input() actions: DefinicaoActions[] = [];

  tamanhoOpcoes = Tamanhos;
  totalItens: number;
  tamanho: number = 10;
  paginalAtual: number = 1;
  direcaoOrdenacao: string = null;
  colunaOrdenacao: string = null;

  @Output() requestParamsEmitter = new EventEmitter<PaginadoOrdenadoRequest>();

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

    this.requestParamsEmitter.emit(pagina);
  }

}
