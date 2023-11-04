import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.css'],
})
export class DynamicFilterComponent {
  parametroDeFiltro: string = '';
  parametroDeFiltroSubject = new Subject<void>();

  @Output() parametro = new EventEmitter<string>();
  @Input() nomeDoCampo: string = '';

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
