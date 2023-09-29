import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrcamentoService } from 'src/app/services/orcamento.service';

@Component({
  selector: 'app-produtos-do-orcamento',
  templateUrl: './produtos-do-orcamento.component.html',
  styleUrls: ['./produtos-do-orcamento.component.css'],
})
export class ProdutosDoOrcamentoComponent implements OnInit {
  form: FormGroup;
  @Input() itensIniciais: any[];

  constructor(
    private formBuilder: FormBuilder,
    private orcamentoService: OrcamentoService
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.mapearItensIniciais();
    this.adicionarProdutoListener();
  }

  mapearItensIniciais() {
    this.itensIniciais.forEach((e) => this.adicionarLinha(e));
  }

  adicionarProdutoListener() {
    this.orcamentoService.produtoAdicionado.subscribe((produto) =>
      this.adicionarLinha(produto)
    );
  }

  private criarForm() {
    this.form = this.formBuilder.group({
      produtosParaAdicionar: this.formBuilder.array([]),
    });
  }

  get rows(): FormArray {
    return this.form.get('produtosParaAdicionar') as FormArray;
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
      quantidade: [produto.quantidade, Validators.required],
      precoUnitario: [produto.precoUnitario, Validators.required],
    });

    this.rows.push(rowFormGroup);
  }

  removerProduto(index: number) {
    this.rows.removeAt(index);
  }
}
