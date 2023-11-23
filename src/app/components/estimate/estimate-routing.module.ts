import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrcamentosComponent } from './estimate.component';
import { OrcamentoDetalhesComponent } from './estimate-details/estimate-details.component';

const routes: Routes = [
  { path: '', component: OrcamentosComponent },
  { path: 'criar', component: OrcamentoDetalhesComponent },
  { path: ':orcamentoId/editar', component: OrcamentoDetalhesComponent },
  { path: ':orcamentoId/visualizar', component: OrcamentoDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentosRoutingModule {}