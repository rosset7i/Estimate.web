import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.css'],
})
export class DynamicFilterComponent {
  @Input() nomeDoCampo: string = '';
  parametroDeFiltro: string = '';
  @Output() parametro = new EventEmitter<string>();
  parametroDeFiltroSubject = new Subject<void>();

  constructor() {
    this.listener();
  }

  listener() {
    this.parametroDeFiltroSubject.pipe(debounceTime(500)).subscribe(() => {
      this.enviarParametro();
    });
  }

  enviarParametro() {
    this.parametro.emit(this.parametroDeFiltro);
  }
}
