import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  public isLoading: boolean = false;

  public constructor(private loadingService: LoadingService) {}

  public ngOnInit(): void {
    this.loopUpRequestLoading();
  }

  private loopUpRequestLoading(): void {
    this.loadingService
      .isLoading()
      .subscribe((loading) => (this.isLoading = loading));
  }
}
