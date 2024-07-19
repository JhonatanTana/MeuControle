import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoPageComponent } from './forma-pagamento-page.component';

describe('FormaPagamentoPageComponent', () => {
  let component: FormaPagamentoPageComponent;
  let fixture: ComponentFixture<FormaPagamentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormaPagamentoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
