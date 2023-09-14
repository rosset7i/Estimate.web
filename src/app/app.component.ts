import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public constructor(private signalRService: SignalRService) {
  }

  public ngOnInit(): void {
    this.signalRService.configNotification();
  }

}
