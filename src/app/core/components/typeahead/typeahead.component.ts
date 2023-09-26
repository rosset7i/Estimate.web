import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
})
export class TypeaheadComponent implements OnInit {
  parametroDeFiltro: string = '';
  lastKey: number = 0;
  filtroAtivado: boolean = false;
  @Output() parametro = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  enviarParametro() {
    console.log('Bate');
    this.parametro.emit(this.parametroDeFiltro);
  }

  mostrarFiltro() {
    this.filtroAtivado = !this.filtroAtivado;
  }
}
