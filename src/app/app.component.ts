import { PaginadoOrdenadoRequest } from './core/models/paginado-ordenado-request';
import { ProdutoService } from './services/produto.service';
import { UsuarioService } from './services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private produtoService: ProdutoService){}

  ngOnInit(): void {
    const seiLa = new PaginadoOrdenadoRequest(2, 20, 'Nome', 'ASC');

    this.produtoService.buscaProdutosPaginado(seiLa).subscribe(resultado => console.log(resultado));
  }
}
