import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMouvementComponent } from './edit-mouvement.component';

describe('EditMouvementComponent', () => {
  let component: EditMouvementComponent;
  let fixture: ComponentFixture<EditMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMouvementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
