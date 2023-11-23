import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrcamentosComponent } from './estimate.component';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';

const routes: Routes = [
  { path: '', component: OrcamentosComponent },
  { path: 'criar', component: EstimateDetailsComponent },
  { path: ':orcamentoId/editar', component: EstimateDetailsComponent },
  { path: ':orcamentoId/visualizar', component: EstimateDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentosRoutingModule {}
