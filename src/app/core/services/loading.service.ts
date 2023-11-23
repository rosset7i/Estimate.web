import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: Subject<boolean> = new Subject<boolean>();

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }

  isLoading() {
    return this.loading.asObservable();
  }
}
