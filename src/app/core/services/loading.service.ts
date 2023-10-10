import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: Subject<boolean> = new Subject<boolean>();

  mostrar() {
    this.loading.next(true);
  }

  esconder() {
    this.loading.next(false);
  }

  estaCarregando() {
    return this.loading.asObservable();
  }
}
