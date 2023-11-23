import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/services/product.service';
import { ProductResponse } from '../models/product-response';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  form: FormGroup;

  @Output() emitFormValue = new EventEmitter<any>();
  @Input() produtoId: string;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProductService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.buscarUsuarioSeExistir();
    this.criarForm();
  }

  private mapearValores(produto: ProductResponse) {
    this.form.controls['nome'].setValue(produto.nome);
  }

  private async buscarUsuarioSeExistir() {
    if (this.produtoId)
      this.produtoService
        .fetchProductDetails(this.produtoId)
        .subscribe((e: ProductResponse) => this.mapearValores(e));
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
