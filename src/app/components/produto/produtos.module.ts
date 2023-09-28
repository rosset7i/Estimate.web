import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ComponentesPadraoModule } from 'src/app/core/components/componentes-padrao.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoModalComponent } from './produto-modal/produto-modal.component';

@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutoListComponent,
    ProdutoModalComponent,
  ],
  imports: [
    CommonModule,
    ComponentesPadraoModule,
    ProdutosRoutingModule,
    ReactiveFormsModule,
    NgbModalModule,
  ],
})
export class ProdutosModule {}
