import { TestBed } from '@angular/core/testing';

import { MinistereService } from './ministere.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CorrespondanceService} from "./correspondance.service";

describe('MinistereService', () => {
  let service: MinistereService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule,RouterTestingModule],
      providers: [MinistereService]
    });
    service = TestBed.inject(MinistereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
