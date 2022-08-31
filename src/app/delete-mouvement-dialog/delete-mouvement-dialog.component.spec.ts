import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMouvementDialogComponent } from './delete-mouvement-dialog.component';

describe('DeleteMouvementDialogComponent', () => {
  let component: DeleteMouvementDialogComponent;
  let fixture: ComponentFixture<DeleteMouvementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMouvementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMouvementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
