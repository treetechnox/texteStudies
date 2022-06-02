import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMouvementComponent } from './add-mouvement.component';

describe('AddMouvementComponent', () => {
  let component: AddMouvementComponent;
  let fixture: ComponentFixture<AddMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMouvementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
