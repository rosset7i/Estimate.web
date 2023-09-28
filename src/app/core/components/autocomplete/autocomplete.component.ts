import { ResultadoPaginadoDe } from './../../models/resultado-paginado';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Observable,
  OperatorFunction,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
} from 'rxjs';

import { ProdutoService } from 'src/app/services/produto.service';
import { PaginadoOrdenadoRequest } from '../../models/paginado-ordenado-request';
import { ProdutoPaginadoRequest } from 'src/app/components/produto/models/produto-paginado-request';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  itens: string[] = [];

  constructor(private produtosTeste: ProdutoService) {}

  ngOnInit(): void {
    this.buscarItens();
  }

  logar(any) {
    console.log(any);
  }

  buscarItens() {
    const pagina = new PaginadoOrdenadoRequest(1, 10, null, null);
    const pagina2 = new ProdutoPaginadoRequest(null, pagina);
    this.produtosTeste
      .buscaProdutosPaginado(pagina2)
      .subscribe((e) => (this.itens = e.itens.map(e => e.nome)));
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        this.itens
          .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
      )
    );
}
