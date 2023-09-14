import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-refresh-modal',
  templateUrl: './refresh-modal.component.html',
  styleUrls: ['./refresh-modal.component.css'],
})
export class RefreshModalComponent implements OnInit {
  public form: FormGroup;

  @Input() private email: string;

  public constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [
        this.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.required],
    });
  }

  public login(): void {
    this.activeModal.close(this.form.value);
  }

  public get canSave(): boolean {
    return this.form.valid;
  }
}
