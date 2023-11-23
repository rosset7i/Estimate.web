import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrcamentosComponent } from './estimate.component';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';

const routes: Routes = [
  { path: '', component: OrcamentosComponent },
  { path: 'create', component: EstimateDetailsComponent },
  { path: ':estimateId/edit', component: EstimateDetailsComponent },
  { path: ':estimateId/view', component: EstimateDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentosRoutingModule {}
