import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonComponentsModule } from 'src/app/core/components/common.components.module';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierModalComponent } from './supplier-modal/supplier-modal.component';
import { FornecedoresRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';

@NgModule({
  declarations: [
    SupplierComponent,
    SupplierListComponent,
    SupplierModalComponent,
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    CommonComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
  ],
})
export class SupplierModule {}
