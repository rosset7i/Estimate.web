import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrarFormComponent } from './registrar-form/registrar-form.component';

const routes: Routes = [
  { path: 'registrar', component: RegistrarFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: 'registrar' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacaoRoutingModule {}
