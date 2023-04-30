import { TestBed } from '@angular/core/testing';

import { SalleService } from './salle.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClientModule} from "@angular/common/http";

describe('SalleService', () => {
  let service: SalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [SalleService]
    });
    service = TestBed.inject(SalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
