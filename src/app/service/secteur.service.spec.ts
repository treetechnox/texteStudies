import { TestBed } from '@angular/core/testing';

import { SecteurService } from './secteur.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClientModule} from "@angular/common/http";

describe('SecteurService', () => {
  let service: SecteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [SecteurService]
    });
    service = TestBed.inject(SecteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
