import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPadraoComponent } from '../common-list.component';
import { DefinicaoTabela } from 'src/app/core/models/list-definition';
import { of } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { AcaoDaTabela } from 'src/app/core/models/list-action';

describe('AppComponent', () => {
  let component: ListaPadraoComponent;
  let fixture: ComponentFixture<ListaPadraoComponent>;
  let mockOpcoesTabela: DefinicaoTabela;
});
