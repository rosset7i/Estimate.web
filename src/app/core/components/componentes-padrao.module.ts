import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ListaPadraoComponent } from './lista-padrao/lista-padrao.component';
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { RefreshModalComponent } from './refresh-modal/refresh-modal.component';

@NgModule({
  declarations: [
    ListaPadraoComponent,
    DynamicFilterComponent,
    AutocompleteComponent,
    ModalMessageComponent,
    RefreshModalComponent,
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
  ],
})
export class ComponentesPadraoModule {}
