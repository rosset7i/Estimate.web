import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ComponentesPadraoModule } from 'src/app/core/components/componentes-padrao.module';

@NgModule({
  declarations: [ProdutosComponent, ProdutoListComponent],
  imports: [CommonModule, ComponentesPadraoModule, ProdutosRoutingModule],
})
export class ProdutosModule {}
