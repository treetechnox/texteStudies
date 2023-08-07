import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoriseDialogComponent } from './autorise-dialog.component';

describe('AutoriseDialogComponent', () => {
  let component: AutoriseDialogComponent;
  let fixture: ComponentFixture<AutoriseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoriseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoriseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
