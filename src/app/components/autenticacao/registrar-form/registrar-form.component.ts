import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from './../../../services/usuario.service';

@Component({
  selector: 'app-registrar-form',
  templateUrl: './registrar-form.component.html',
  styleUrls: ['./registrar-form.component.css'],
})
export class RegistrarFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      userName: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      senha: [null, Validators.required],
    });
  }

  registrar() {
    this.usuarioService
      .registrar(this.form.value)
      .subscribe(() => this.router.navigate(['/autenticacao/login']));
  }

  get canSave(): boolean {
    return this.form.valid;
  }
}
