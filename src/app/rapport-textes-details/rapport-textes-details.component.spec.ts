import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportTextesDetailsComponent } from './rapport-textes-details.component';

describe('RapportTextesDetailsComponent', () => {
  let component: RapportTextesDetailsComponent;
  let fixture: ComponentFixture<RapportTextesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportTextesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportTextesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
