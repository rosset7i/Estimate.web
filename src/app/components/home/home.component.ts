import { Component } from '@angular/core';
import { ModalDefinition } from 'src/app/core/models/modal-definition';

import { MessageService } from 'src/app/core/services/message.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {}

  public async logout(): Promise<void> {
    await this.messageService
      .openMessageModal(
        new ModalDefinition(
          'Attention!',
          'Are you sure you want to logout?',
          true
        )
      )
      .then(async (e) => {
        if (e) await this.authenticationService.logout();
      });
  }
}
