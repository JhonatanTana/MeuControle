import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoListComponent } from './historico-list.component';

describe('HistoricoListComponent', () => {
  let component: HistoricoListComponent;
  let fixture: ComponentFixture<HistoricoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
