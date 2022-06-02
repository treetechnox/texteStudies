import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMouvementComponent } from './list-mouvement.component';

describe('ListMouvementComponent', () => {
  let component: ListMouvementComponent;
  let fixture: ComponentFixture<ListMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMouvementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
