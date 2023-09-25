import { PaginadoOrdenadoRequest } from './core/models/paginado-ordenado-request';
import { ProdutoService } from './services/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private produtoService: ProdutoService){}

  ngOnInit(): void {
  }
}
