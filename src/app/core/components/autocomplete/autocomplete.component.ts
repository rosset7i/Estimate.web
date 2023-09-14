import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
} from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  @Input() public selectedItem: unknown;
  @Input() public values: unknown[];
  @Input() public disabled: boolean;
  @Input() public searchFields: string[];
  @Input() public placeholder: string = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() public selected: EventEmitter<any> = new EventEmitter<any>();

  public onFocus: Subject<string> = new Subject<string>();

  private objByField = new Map<string, unknown>();

  public search = (text: Observable<string>): Observable<string[]> => {
    const debounceText = text.pipe(debounceTime(200), distinctUntilChanged());
    return merge(debounceText, this.onFocus).pipe(
      map((term) =>
        this.values
          .filter((v) => this.buildSearch(v, term))
          .map((obj) => this.showOptions(obj))
      )
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emitSelectedItem(event: any): void {
    this.selected.emit(this.objByField.get(event.item));
  }

  private showOptions(obj: unknown): string {
    const fields = this.searchFields
      .map((field) => {
        return obj[field];
      })
      .join('');

    this.setObjToSearch(fields, obj);

    return fields;
  }

  private buildSearch(value: unknown, term: string): boolean {
    return this.searchFields
      .map((field) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!field || !value.hasOwnProperty(field)) {
          return '';
        }

        const fieldValue = value[field];

        if (typeof fieldValue === 'number') {
          return fieldValue;
        }

        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase();
        }

        return '';
      })
      .join('')
      .toLowerCase()
      .includes(term.toLowerCase());
  }

  private setObjToSearch(field: string, obj: unknown): void {
    this.objByField.set(field, obj);
  }
}
