import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing.module';
import { OrcamentosComponent } from './orcamentos.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { ComponentesPadraoModule } from '../../core/components/componentes-padrao.module';
import { OrcamentoDetalhesComponent } from './orcamento-detalhes/orcamento-detalhes.component';
import { RouterModule } from '@angular/router';
import { SeletorProdutosComponent } from './seletor-produtos/seletor-produtos.component';

@NgModule({
  declarations: [
    OrcamentosComponent,
    OrcamentoListComponent,
    OrcamentoDetalhesComponent,
    SeletorProdutosComponent,
  ],
  imports: [
    CommonModule,
    OrcamentosRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentesPadraoModule,
  ],
})
export class OrcamentosModule {}
