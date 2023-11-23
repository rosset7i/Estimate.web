import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ProdutosRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonComponentsModule } from 'src/app/core/components/common.components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductModalComponent } from './product-modal/product-modal.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductModalComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    ProdutosRoutingModule,
    ReactiveFormsModule,
    NgbModalModule,
  ],
})
export class ProdutosModule {}
