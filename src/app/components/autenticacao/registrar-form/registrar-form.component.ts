import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AutenticacaoService } from './../../../services/usuario.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { DefinicaoModal } from 'src/app/core/models/modal-definicao';

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
    private autenticacaoService: AutenticacaoService,
    private modalService: ModalService,
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
    this.autenticacaoService
      .registrar(this.form.value)
      .subscribe(() => {
        this.modalService.abrirModal(new DefinicaoModal('Sucesso!', 'Usuario criado com sucesso!', false))
        this.router.navigate(['/autenticacao/login']);
      });
  }

  get canSave(): boolean {
    return this.form.valid;
  }
}
