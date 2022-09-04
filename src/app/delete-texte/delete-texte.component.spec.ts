import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTexteComponent } from './delete-texte.component';

describe('DeleteTexteComponent', () => {
  let component: DeleteTexteComponent;
  let fixture: ComponentFixture<DeleteTexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
