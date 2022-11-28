import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistereTexteComponent } from './ministere-texte.component';

describe('MinistereTexteComponent', () => {
  let component: MinistereTexteComponent;
  let fixture: ComponentFixture<MinistereTexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistereTexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistereTexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
