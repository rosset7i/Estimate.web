import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      { path: 'orcamentos', loadChildren: () => import('./components/orcamento/orcamentos.module').then(m => m.OrcamentosModule) },
      { path: 'fornecedores', loadChildren: () => import('./components/fornecedor/fornecedores.module').then(m => m.FornecedoresModule) },
      { path: 'produtos', loadChildren: () => import('./components/produto/produtos.module').then(m => m.ProdutosModule) },
      { path: 'autenticacao', loadChildren: () => import('./components/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
