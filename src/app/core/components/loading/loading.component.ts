import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  public estaCarregando: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loopUpRequestLoading();
  }

  private loopUpRequestLoading() {
    this.loadingService
      .estaCarregando()
      .subscribe((loading) => (this.estaCarregando = loading));
  }
}
