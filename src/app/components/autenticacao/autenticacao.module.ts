import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrarFormComponent } from './registrar-form/registrar-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrarFormComponent
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AutenticacaoModule { }
