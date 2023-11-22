import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDefinition } from '../models/modal-definition';
import { ModalMessageComponent } from '../components/modal-message/modal-message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private modalService: NgbModal) {}

  openMessageModal(modalDef: ModalDefinition) {
    const modalRef = this.modalService.open(ModalMessageComponent);

    modalRef.componentInstance.modalDef = modalDef;

    return modalRef.result.catch(() => this.errorSupressor());
  }

  private errorSupressor() {
    return;
  }
}
