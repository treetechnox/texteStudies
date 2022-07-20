import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCorrespondanceComponent } from './edit-correspondance.component';

describe('EditCorrespondanceComponent', () => {
  let component: EditCorrespondanceComponent;
  let fixture: ComponentFixture<EditCorrespondanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCorrespondanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorrespondanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
