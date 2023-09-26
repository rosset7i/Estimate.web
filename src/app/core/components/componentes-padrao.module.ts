import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPadraoComponent } from './lista-padrao/lista-padrao.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@NgModule({
  declarations: [ListaPadraoComponent, TypeaheadComponent],
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  exports: [ListaPadraoComponent, TypeaheadComponent],
})
export class ComponentesPadraoModule {}
