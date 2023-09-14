import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Resources } from '../utils/notification-resources';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {

  public constructor(
    private tokenService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  public configNotification(): void {
    //TODO: adjust url
    const hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7000/notification-hub', {
        accessTokenFactory: () => {
          return this.tokenService.getToken();  
        }
      })
      .withAutomaticReconnect()
      .build();

    hubConnection.on(Resources.NOTIFICATION_HUB, (messages) => {
      this.toastr.success(messages, 'Success!')
    });

    hubConnection
      .start()
      .then(() => console.log('Connection successfull!'))
      .catch(() => console.log('Error while establishing connection!'));
  }
}
