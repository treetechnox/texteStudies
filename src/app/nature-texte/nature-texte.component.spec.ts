import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureTexteComponent } from './nature-texte.component';

describe('NatureTexteComponent', () => {
  let component: NatureTexteComponent;
  let fixture: ComponentFixture<NatureTexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureTexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureTexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
