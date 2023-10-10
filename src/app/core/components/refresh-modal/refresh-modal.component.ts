import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-refresh-modal',
  templateUrl: './refresh-modal.component.html',
  styleUrls: ['./refresh-modal.component.css'],
})
export class RefreshModalComponent implements OnInit {
  form: FormGroup;
  @Input() email: string;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [
        this.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      senha: [null, Validators.required],
    });
  }

  login() {
    this.activeModal.close(this.form.value);
  }

  get canSave(): boolean {
    return this.form.valid;
  }
}
