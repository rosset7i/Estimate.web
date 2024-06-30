import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDefinition } from '../../models/modal-definition';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent {
  @Input() public modalDef: ModalDefinition;

  public constructor(public activeModal: NgbActiveModal) {}

  public confirm(): void {
    this.activeModal.close(true);
  }

  public cancel(): void {
    this.activeModal.close(false);
  }
}
