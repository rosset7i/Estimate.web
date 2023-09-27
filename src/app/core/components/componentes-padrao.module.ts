import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaPadraoComponent } from './lista-padrao/lista-padrao.component';
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter.component';

@NgModule({
  declarations: [ListaPadraoComponent, DynamicFilterComponent],
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  exports: [ListaPadraoComponent, DynamicFilterComponent],
})
export class ComponentesPadraoModule {}
