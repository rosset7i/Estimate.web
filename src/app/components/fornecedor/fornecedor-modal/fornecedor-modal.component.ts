import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FornecedorResponse } from '../models/fornecedor-response';

@Component({
  selector: 'app-fornecedor-modal',
  templateUrl: './fornecedor-modal.component.html',
  styleUrls: ['./fornecedor-modal.component.css'],
})
export class FornecedorModalComponent implements OnInit {
  form: FormGroup;

  @Input() fornecedorId: string;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.buscarUsuarioSeExistir();
    this.criarForm();
  }

  private mapearValores(fornecedor: FornecedorResponse) {
    this.form.controls['nome'].setValue(fornecedor.nome);
  }

  private buscarUsuarioSeExistir() {
    if (this.fornecedorId)
      this.fornecedorService
        .buscaFornecedorDetalhes(this.fornecedorId)
        .subscribe((e: FornecedorResponse) => this.mapearValores(e));
  }

  private criarForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  get canSave() {
    return this.form.valid && this.form.dirty;
  }

  save() {
    this.activeModal.close(this.form.value);
  }
}
