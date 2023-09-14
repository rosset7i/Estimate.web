import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.css'],
})
export class DynamicFilterComponent {
  public filterParam: string = '';
  public filterParamSubject = new Subject<void>();

  @Output() private param = new EventEmitter<string>();
  @Input() public fieldName: string = '';

  public constructor() {
    this.listener();
  }

  private listener(): void {
    this.filterParamSubject.pipe(debounceTime(500)).subscribe(() => {
      this.sendParam();
    });
  }

  private sendParam(): void {
    this.param.emit(this.filterParam);
  }
}
