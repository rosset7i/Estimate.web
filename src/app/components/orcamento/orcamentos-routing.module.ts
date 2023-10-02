import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrcamentosComponent } from './orcamentos.component';
import { OrcamentoDetalhesComponent } from './orcamento-detalhes/orcamento-detalhes.component';

const routes: Routes = [
  { path: '', component: OrcamentosComponent },
  { path: 'criar', component: OrcamentoDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentosRoutingModule {}
