import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPadraoComponent } from './lista-padrao/lista-padrao.component';

@NgModule({
  declarations: [
    ListaPadraoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListaPadraoComponent
  ]
})
export class ComponentesPadraoModule { }
