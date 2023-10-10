import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefinicaoModal } from '../models/modal-definicao';
import { ModalMessageComponent } from '../components/modal-message/modal-message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private modalService: NgbModal) {}

  abrirModal(modalDef: DefinicaoModal) {
    const modalRef = this.modalService.open(ModalMessageComponent);

    modalRef.componentInstance.modalDef = modalDef;

    return modalRef.result;
  }
}
