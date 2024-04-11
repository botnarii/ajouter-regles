import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousRegleComponent } from './sous-regle.component';

describe('SousRegleComponent', () => {
  let component: SousRegleComponent;
  let fixture: ComponentFixture<SousRegleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousRegleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SousRegleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
