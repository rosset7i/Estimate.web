import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { AutenticacaoComponent } from './autenticacao.component';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  declarations: [
    AutenticacaoComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule
  ]
})
export class AutenticacaoModule { }
