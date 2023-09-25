import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPadraoComponent } from './lista-padrao/lista-padrao.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ListaPadraoComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule
  ],
  exports: [
    ListaPadraoComponent
  ]
})
export class ComponentesPadraoModule { }
