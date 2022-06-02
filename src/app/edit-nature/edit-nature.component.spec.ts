import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNatureComponent } from './edit-nature.component';

describe('EditNatureComponent', () => {
  let component: EditNatureComponent;
  let fixture: ComponentFixture<EditNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
