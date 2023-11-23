import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ListaPadraoComponent } from './common-list/common-list.component';
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { RefreshModalComponent } from './refresh-modal/refresh-modal.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    ListaPadraoComponent,
    DynamicFilterComponent,
    AutocompleteComponent,
    ModalMessageComponent,
    RefreshModalComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
  ],
  exports: [
    ListaPadraoComponent,
    DynamicFilterComponent,
    AutocompleteComponent,
    LoadingComponent,
  ],
})
export class ComponentesPadraoModule {}
