import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrcamentosComponent } from './orcamentos.component';

const routes: Routes = [{ path: '', component: OrcamentosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrcamentosRoutingModule { }
