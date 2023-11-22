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
  constructor(
    private autenticacaoService: AuthenticationService,
    private messageService: MessageService
  ) {}

  logout() {
    this.messageService
      .openMessageModal(
        new ModalDefinition(
          'Atenção!',
          'Você tem certeza que deseja sair?',
          true
        )
      )
      .then((e) => {
        if (e) this.autenticacaoService.logout();
      });
  }
}
