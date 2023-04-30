import { TestBed } from '@angular/core/testing';

import { NatureService } from './nature.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClientModule} from "@angular/common/http";

describe('NatureService', () => {
  let service: NatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [NatureService]});
    service = TestBed.inject(NatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
