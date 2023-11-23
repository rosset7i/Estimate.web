import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './estimate-routing.module';
import { OrcamentosComponent } from './estimate.component';
import { OrcamentoListComponent } from './estimate-list/estimate-list.component';
import { ComponentesPadraoModule } from '../../core/components/common.module';
import { OrcamentoDetalhesComponent } from './estimate-details/estimate-details.component';
import { RouterModule } from '@angular/router';
import { SeletorProdutosComponent } from './product-select/product-select.component';

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
