import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing.module';
import { OrcamentosComponent } from './orcamentos.component';


@NgModule({
  declarations: [
    OrcamentosComponent
  ],
  imports: [
    CommonModule,
    OrcamentosRoutingModule
  ]
})
export class OrcamentosModule { }
