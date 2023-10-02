import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ListaPadraoComponent } from './lista-padrao/lista-padrao.component';
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';

@NgModule({
  declarations: [
    ListaPadraoComponent,
    DynamicFilterComponent,
    AutocompleteComponent,
    ModalMessageComponent,
  ],
  imports: [CommonModule, NgbPaginationModule, FormsModule, NgbTypeaheadModule],
  exports: [
    ListaPadraoComponent,
    DynamicFilterComponent,
    AutocompleteComponent,
  ],
})
export class ComponentesPadraoModule {}
