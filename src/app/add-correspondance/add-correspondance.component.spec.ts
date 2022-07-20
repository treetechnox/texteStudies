import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorrespondanceComponent } from './add-correspondance.component';

describe('AddCorrespondanceComponent', () => {
  let component: AddCorrespondanceComponent;
  let fixture: ComponentFixture<AddCorrespondanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCorrespondanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorrespondanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
