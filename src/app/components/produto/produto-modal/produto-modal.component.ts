import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoResponse } from '../models/produto-response';

@Component({
  selector: 'app-produto-modal',
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.css'],
})
export class ProdutoModalComponent implements OnInit {
  form: FormGroup;

  @Output() emitFormValue = new EventEmitter<any>();
  @Input() produtoId: string;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.buscarUsuarioSeExistir();
    this.criarForm();
  }

  private mapearValores(produto: ProdutoResponse) {
    this.form.controls['nome'].setValue(produto.nome);
  }

  private async buscarUsuarioSeExistir() {
    if (this.produtoId)
      this.produtoService
        .buscaProdutosDetalhes(this.produtoId)
        .subscribe((e: ProdutoResponse) => this.mapearValores(e));
  }

  private criarForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  get canSave(): boolean {
    return this.form.valid && this.form.dirty;
  }

  public save() {
    this.activeModal.close(this.form.value);
  }
}
