import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: Subject<boolean> = new Subject<boolean>();

  public show(): void {
    this.loading.next(true);
  }

  public hide(): void {
    this.loading.next(false);
  }

  public isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
