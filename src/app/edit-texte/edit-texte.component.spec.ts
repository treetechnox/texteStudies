import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTexteComponent } from './edit-texte.component';

describe('EditTexteComponent', () => {
  let component: EditTexteComponent;
  let fixture: ComponentFixture<EditTexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
