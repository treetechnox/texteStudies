import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMinistereComponent } from './list-ministere.component';

describe('ListMinistereComponent', () => {
  let component: ListMinistereComponent;
  let fixture: ComponentFixture<ListMinistereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMinistereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMinistereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
