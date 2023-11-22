import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthenticationGuard } from './components/autenticacao/autenticacao.guard';
import { HomeMenuComponent } from './components/home/home-menu/home-menu.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: HomeMenuComponent },
      {
        path: 'estimates',
        loadChildren: () =>
          import('./components/orcamento/orcamentos.module').then(
            (m) => m.OrcamentosModule
          ),
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./components/fornecedor/fornecedores.module').then(
            (m) => m.FornecedoresModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./components/produto/produtos.module').then(
            (m) => m.ProdutosModule
          ),
      },
    ],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./components/autenticacao/autenticacao.module').then(
        (m) => m.AutenticacaoModule
      ),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
