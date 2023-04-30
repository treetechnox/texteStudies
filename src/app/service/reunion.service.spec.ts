import { TestBed } from '@angular/core/testing';

import { ReunionService } from './reunion.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClientModule} from "@angular/common/http";

describe('ReunionService', () => {
  let service: ReunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [ReunionService]
    });
    service = TestBed.inject(ReunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
