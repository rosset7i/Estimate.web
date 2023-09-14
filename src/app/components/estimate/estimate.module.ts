import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimateRoutingModule } from './estimate-routing.module';
import { EstimateComponent } from './estimate.component';
import { EstimateListComponent } from './estimate-list/estimate-list.component';
import { CommonComponentsModule } from '../../core/components/common.components.module';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';
import { RouterModule } from '@angular/router';
import { ProductSelectComponent } from './estimate-details/product-select/product-select.component';

@NgModule({
  declarations: [
    EstimateComponent,
    EstimateListComponent,
    EstimateDetailsComponent,
    ProductSelectComponent,
  ],
  imports: [
    CommonModule,
    EstimateRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonComponentsModule,
  ],
})
export class EstimateModule {}
