import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPedidoFormComponent } from './novo-pedido-form.component';

describe('NovoPedidoFormComponent', () => {
  let component: NovoPedidoFormComponent;
  let fixture: ComponentFixture<NovoPedidoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovoPedidoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoPedidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
