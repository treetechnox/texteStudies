import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservateurComponent } from './observateur.component';

describe('ObservateurComponent', () => {
  let component: ObservateurComponent;
  let fixture: ComponentFixture<ObservateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
