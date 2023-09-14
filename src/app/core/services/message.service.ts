import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDefinition } from '../models/modal-definition';
import { ModalMessageComponent } from '../components/modal-message/modal-message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public constructor(private modalService: NgbModal) {}

  public openMessageModal(modalDef: ModalDefinition): Promise<unknown> {
    const modalRef = this.modalService.open(ModalMessageComponent);

    modalRef.componentInstance.modalDef = modalDef;

    return modalRef.result.catch(() => this.errorSuppressor());
  }

  private errorSuppressor(): void {
    return;
  }
}
