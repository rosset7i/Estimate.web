import { ListaPadraoComponent } from '../lista-padrao.component';

describe('AppComponent', () => {
  let fixture: ListaPadraoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPadraoComponent],
      // ... provide any necessary services and dependencies ...
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
