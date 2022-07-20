import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCorrespondanceComponent } from './list-correspondance.component';

describe('ListCorrespondanceComponent', () => {
  let component: ListCorrespondanceComponent;
  let fixture: ComponentFixture<ListCorrespondanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCorrespondanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorrespondanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
