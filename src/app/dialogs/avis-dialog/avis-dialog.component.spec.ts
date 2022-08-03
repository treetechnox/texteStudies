import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisDialogComponent } from './avis-dialog.component';

describe('AvisDialogComponent', () => {
  let component: AvisDialogComponent;
  let fixture: ComponentFixture<AvisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
