import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrcamentoService } from 'src/app/services/orcamento.service';

@Component({
  selector: 'app-produtos-do-orcamento',
  templateUrl: './produtos-do-orcamento.component.html',
  styleUrls: ['./produtos-do-orcamento.component.css'],
})
export class ProdutosDoOrcamentoComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orcamentoService: OrcamentoService
  ) {}

  ngOnInit(): void {
    this.adicionarProdutoListener();
  }

  private adicionarProdutoListener() {
    this.orcamentoService.produtoAdicionado.subscribe((produto) =>
      this.adicionarLinha(produto)
    );
  }

  get rows(): FormArray {
    return this.form.get('produtosNoOrcamento') as FormArray;
  }

  adicionarLinha(produto: any) {
    const rowFormGroup = this.formBuilder.group({
      produtoId: [produto.id, Validators.required],
      nome: [
        {
          value: produto.nome,
          disabled: true,
        },
      ],
      quantidade: [
        produto.quantidade,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      precoUnitario: [
        produto.precoUnitario,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });

    this.rows.push(rowFormGroup);
  }

  removerProduto(index: number) {
    this.rows.removeAt(index);
  }
}
