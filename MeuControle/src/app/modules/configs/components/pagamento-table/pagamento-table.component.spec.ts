import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoTableComponent } from './pagamento-table.component';

describe('PagamentoTableComponent', () => {
  let component: PagamentoTableComponent;
  let fixture: ComponentFixture<PagamentoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagamentoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
