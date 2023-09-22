import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AutenticacaoGuard } from './components/autenticacao/autenticacao.guard';
import { HomeMenuComponent } from './components/home/home-menu/home-menu.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AutenticacaoGuard],
    children:[
      { path: 'home', component: HomeMenuComponent},
      { path: 'orcamentos', loadChildren: () => import('./components/orcamento/orcamentos.module').then(m => m.OrcamentosModule) },
      { path: 'fornecedores', loadChildren: () => import('./components/fornecedor/fornecedores.module').then(m => m.FornecedoresModule) },
      { path: 'produtos', loadChildren: () => import('./components/produto/produtos.module').then(m => m.ProdutosModule) },
    ]
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./components/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
  { path: '**', redirectTo:'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
