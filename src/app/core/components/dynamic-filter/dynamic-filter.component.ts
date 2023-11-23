import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.css'],
})
export class DynamicFilterComponent {
  filterParam: string = '';
  filterParamSubject = new Subject<void>();

  @Output() param = new EventEmitter<string>();
  @Input() fieldName: string = '';

  constructor() {
    this.listener();
  }

  listener() {
    this.filterParamSubject.pipe(debounceTime(500)).subscribe(() => {
      this.sendParam();
    });
  }

  sendParam() {
    this.param.emit(this.filterParam);
  }
}
