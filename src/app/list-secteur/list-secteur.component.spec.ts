import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecteurComponent } from './list-secteur.component';

describe('ListSecteurComponent', () => {
  let component: ListSecteurComponent;
  let fixture: ComponentFixture<ListSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
