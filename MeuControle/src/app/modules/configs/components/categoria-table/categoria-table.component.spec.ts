import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTableComponent } from './categoria-table.component';

describe('CategoriaTableComponent', () => {
  let component: CategoriaTableComponent;
  let fixture: ComponentFixture<CategoriaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
