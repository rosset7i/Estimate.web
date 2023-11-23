import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ModalDefinition } from 'src/app/core/models/modal-definition';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.required],
    });
  }

  register() {
    this.authenticationService.register(this.form.value).subscribe(() => {
      this.messageService.openMessageModal(
        new ModalDefinition(
          'Success!',
          "You've registered successfully!",
          false
        )
      );
      this.router.navigate(['/authentication/login']);
    });
  }

  get canSave() {
    return this.form.valid;
  }
}
