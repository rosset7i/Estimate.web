import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AutenticacaoService } from './../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.form = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      senha: [null, Validators.required],
    });
  }

  login() {
    this.autenticacaoService.login(this.form.value).subscribe((token) => {
      this.autenticacaoService.setToken(token.token);
      this.router.navigate(['/home']);
    });
  }

  get canSave() {
    return this.form.valid;
  }
}
