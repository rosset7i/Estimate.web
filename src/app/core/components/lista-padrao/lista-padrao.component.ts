import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-padrao',
  templateUrl: './lista-padrao.component.html',
  styleUrls: ['./lista-padrao.component.css']
})
export class ListaPadraoComponent implements OnInit {
  @Input() nomeDaLista: string = '';
  @Input() campos: string[] = [];
  @Input() acoes: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
