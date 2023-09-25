import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresComponent } from './fornecedores.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FornecedoresComponent,
    FornecedorListComponent
],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class FornecedoresModule { }
