import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcluiPedidoComponent } from './conclui-pedido.component';

describe('ConcluiPedidoComponent', () => {
  let component: ConcluiPedidoComponent;
  let fixture: ComponentFixture<ConcluiPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcluiPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcluiPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
