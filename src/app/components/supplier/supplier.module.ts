import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentesPadraoModule } from 'src/app/core/components/common.module';
import { FornecedorListComponent } from './supplier-list/supplier-list.component';
import { FornecedorModalComponent } from './supplier-modal/supplier-modal.component';
import { FornecedoresRoutingModule } from './supplier-routing.module';
import { FornecedoresComponent } from './supplier.component';

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
