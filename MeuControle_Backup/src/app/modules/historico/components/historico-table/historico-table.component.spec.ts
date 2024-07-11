import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoTableComponent } from './historico-table.component';

describe('HistoricoTableComponent', () => {
  let component: HistoricoTableComponent;
  let fixture: ComponentFixture<HistoricoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
