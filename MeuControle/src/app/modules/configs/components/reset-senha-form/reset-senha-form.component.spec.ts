import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSenhaFormComponent } from './reset-senha-form.component';

describe('ResetSenhaFormComponent', () => {
  let component: ResetSenhaFormComponent;
  let fixture: ComponentFixture<ResetSenhaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetSenhaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetSenhaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
