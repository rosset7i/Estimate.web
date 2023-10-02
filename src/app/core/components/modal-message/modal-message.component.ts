import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DefinicaoModal } from '../../models/modal-definicao';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent {
  @Input() modalDef: DefinicaoModal;

  constructor(public activeModal: NgbActiveModal) {}

  confirmar() {
    this.activeModal.close(true);
  }

  cancelar() {
    this.activeModal.close(false);
  }
}
