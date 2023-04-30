import { TestBed } from '@angular/core/testing';

import { TracesService } from './traces.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClientModule} from "@angular/common/http";

describe('TracesService', () => {
  let service: TracesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [TracesService]
    });
    service = TestBed.inject(TracesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
