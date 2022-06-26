import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortailMinisteresComponent } from './portail-ministeres.component';

describe('PortailMinisteresComponent', () => {
  let component: PortailMinisteresComponent;
  let fixture: ComponentFixture<PortailMinisteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortailMinisteresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortailMinisteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
