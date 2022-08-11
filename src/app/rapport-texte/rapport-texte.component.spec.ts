import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportTexteComponent } from './rapport-texte.component';

describe('RapportTexteComponent', () => {
  let component: RapportTexteComponent;
  let fixture: ComponentFixture<RapportTexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportTexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportTexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
