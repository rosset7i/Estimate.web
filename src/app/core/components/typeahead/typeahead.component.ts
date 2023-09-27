import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
})
export class TypeaheadComponent {
  parametroDeFiltro: string = '';
  lastKey: number = 0;
  @Output() parametro = new EventEmitter<string>();

  enviarParametro() {
    this.parametro.emit(this.parametroDeFiltro);
  }
}
