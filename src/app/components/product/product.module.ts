import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ProdutosRoutingModule } from './product-routing.module';
import { ProdutosComponent } from './product.component';
import { ProdutoListComponent } from './product-list/produto-list.component';
import { ComponentesPadraoModule } from 'src/app/core/components/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoModalComponent } from './product-modal/produto-modal.component';

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
