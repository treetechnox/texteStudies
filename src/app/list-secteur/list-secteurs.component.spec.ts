import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecteursComponent } from './list-secteurs.component';

describe('ListSecteurComponent', () => {
  let component: ListSecteursComponent;
  let fixture: ComponentFixture<ListSecteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSecteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSecteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
