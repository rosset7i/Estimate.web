import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './estimate-routing.module';
import { OrcamentosComponent } from './estimate.component';
import { EstimateListComponent } from './estimate-list/estimate-list.component';
import { CommonComponentsModule } from '../../core/components/common.components.module';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';
import { RouterModule } from '@angular/router';
import { ProdutSelectComponent } from './product-select/product-select.component';

@NgModule({
  declarations: [
    OrcamentosComponent,
    EstimateListComponent,
    EstimateDetailsComponent,
    ProdutSelectComponent,
  ],
  imports: [
    CommonModule,
    OrcamentosRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonComponentsModule,
  ],
})
export class OrcamentosModule {}
