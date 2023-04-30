import { TestBed } from '@angular/core/testing';

import { CorrespondanceService } from './correspondance.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('CorrespondanceService', () => {
  let service: CorrespondanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule,RouterTestingModule],
      providers: [CorrespondanceService]
    });
    service = TestBed.inject(CorrespondanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
