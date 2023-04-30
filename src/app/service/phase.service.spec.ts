import { TestBed } from '@angular/core/testing';

import { PhaseService } from './phase.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PhaseService', () => {
  let service: PhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [PhaseService]
    });
    service = TestBed.inject(PhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
