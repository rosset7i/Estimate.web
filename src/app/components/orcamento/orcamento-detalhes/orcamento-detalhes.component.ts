import { Component, OnInit } from '@angular/core';

import { OpcoesTabela } from 'src/app/core/models/opcoes-tabela';
import { PaginadoOrdenadoRequest } from 'src/app/core/models/paginado-ordenado-request';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { FornecedorResponse } from '../../fornecedor/models/fornecedor-response';
import { ProdutoPaginadoRequest } from '../../produto/models/produto-paginado-request';

@Component({
  selector: 'app-orcamento-detalhes',
  templateUrl: './orcamento-detalhes.component.html',
  styleUrls: ['./orcamento-detalhes.component.css'],
})
export class OrcamentoDetalhesComponent implements OnInit {
  paraAdicionar: any[] = [
    {
      id: 'ToTestandoId',
      nome: 'Nome produto',
      quantidade: 10,
      precoUnitario: 110,
    },
  ];
  fornecedores: FornecedorResponse[];
  opcoes: OpcoesTabela;
  parametro: string;
  searchFields = ['nome'];

  constructor(
    private fornecedorService: FornecedorService,
    private orcamentoService: OrcamentoService
  ) {}

  ngOnInit(): void {
    this.buscarFornecedores();
  }

  adicionarNoOrcamento(produto: any) {
    this.orcamentoService.produtoAdicionado.next(produto);
  }

  private buscarFornecedores() {
    const pagina = new PaginadoOrdenadoRequest(1, 10, null, null);
    const pagina2 = new ProdutoPaginadoRequest(null, pagina);
    this.fornecedorService
      .buscaFornecedoresPaginado(pagina2)
      .subscribe((e) => (this.fornecedores = e.itens));
  }

  public selecionarFornecedor(fornecedor: FornecedorResponse): void {
    console.log(fornecedor);
  }
}
