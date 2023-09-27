import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaPadraoComponent } from './lista-padrao/lista-padrao.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@NgModule({
  declarations: [ListaPadraoComponent, TypeaheadComponent],
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  exports: [ListaPadraoComponent, TypeaheadComponent],
})
export class ComponentesPadraoModule {}
