import { Component } from '@angular/core';
import { DefinicaoModal } from 'src/app/core/models/modal-definicao';

import { MessageService } from 'src/app/core/services/message.service';
import { AutenticacaoService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private messageService: MessageService
  ) {}

  logout() {
    this.messageService
      .abrirModalComMensagem(
        new DefinicaoModal(
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
