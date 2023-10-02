import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing.module';
import { OrcamentosComponent } from './orcamentos.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { ComponentesPadraoModule } from '../../core/components/componentes-padrao.module';
import { OrcamentoDetalhesComponent } from './orcamento-detalhes/orcamento-detalhes.component';
import { ProdutoPickerComponent } from './produto-picker/produto-picker.component';
import { ProdutosDoOrcamentoComponent } from './produtos-do-orcamento/produtos-do-orcamento.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrcamentosComponent,
    OrcamentoListComponent,
    OrcamentoDetalhesComponent,
    ProdutoPickerComponent,
    ProdutosDoOrcamentoComponent,
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
