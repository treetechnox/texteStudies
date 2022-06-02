import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMinistereComponent } from './edit-ministere.component';

describe('EditMinistereComponent', () => {
  let component: EditMinistereComponent;
  let fixture: ComponentFixture<EditMinistereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMinistereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMinistereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
