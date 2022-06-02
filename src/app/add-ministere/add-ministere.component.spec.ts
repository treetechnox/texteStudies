import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinistereComponent } from './add-ministere.component';

describe('AddMinistereComponent', () => {
  let component: AddMinistereComponent;
  let fixture: ComponentFixture<AddMinistereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMinistereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMinistereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
