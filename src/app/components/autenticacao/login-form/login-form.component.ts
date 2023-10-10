import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AutenticacaoService } from './../../../services/usuario.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      senha: [null, Validators.required],
    });
  }

  login() {
    this.autenticacaoService.login(this.form.value);
  }

  get canSave(): boolean {
    return this.form.valid;
  }
}
