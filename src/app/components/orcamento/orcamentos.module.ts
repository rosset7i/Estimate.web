import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing.module';
import { OrcamentosComponent } from './orcamentos.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { ComponentesPadraoModule } from '../../core/components/componentes-padrao.module';

@NgModule({
  declarations: [OrcamentosComponent, OrcamentoListComponent],
  imports: [
    CommonModule,
    OrcamentosRoutingModule,
    FormsModule,
    ComponentesPadraoModule,
  ],
})
export class OrcamentosModule {}
