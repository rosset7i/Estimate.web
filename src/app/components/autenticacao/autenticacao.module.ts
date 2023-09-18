import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { AutenticacaoComponent } from './autenticacao.component';


@NgModule({
  declarations: [
    AutenticacaoComponent
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule
  ]
})
export class AutenticacaoModule { }
