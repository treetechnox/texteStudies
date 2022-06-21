import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportJournalierComponent } from './rapport-journalier.component';

describe('RapportJournalierComponent', () => {
  let component: RapportJournalierComponent;
  let fixture: ComponentFixture<RapportJournalierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportJournalierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportJournalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
