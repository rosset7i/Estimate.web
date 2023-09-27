import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentesPadraoModule } from 'src/app/core/components/componentes-padrao.module';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { FornecedorModalComponent } from './fornecedor-modal/fornecedor-modal.component';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresComponent } from './fornecedores.component';

@NgModule({
  declarations: [
    FornecedoresComponent,
    FornecedorListComponent,
    FornecedorModalComponent,
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    ComponentesPadraoModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
  ],
})
export class FornecedoresModule {}
