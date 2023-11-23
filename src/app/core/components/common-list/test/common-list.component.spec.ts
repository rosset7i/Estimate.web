import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonListComponent } from '../common-list.component';
import { ListDefinition } from 'src/app/core/models/list-definition';
import { of } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { DefinicaoColuna } from 'src/app/core/models/definicao-coluna';
import { ListAction } from 'src/app/core/models/list-action';

describe('AppComponent', () => {
  let component: CommonListComponent;
  let fixture: ComponentFixture<CommonListComponent>;
  let mockOpcoesTabela: ListDefinition;
});
