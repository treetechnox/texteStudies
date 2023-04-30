import { TestBed } from '@angular/core/testing';

import { AvisService } from './avis.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {CorrespondanceService} from "./correspondance.service";

describe('AvisService', () => {
  let service: AvisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule,RouterTestingModule],
      providers: [AvisService]
    });
    service = TestBed.inject(AvisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
