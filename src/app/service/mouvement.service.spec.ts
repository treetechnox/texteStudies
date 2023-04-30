import { TestBed } from '@angular/core/testing';

import { MouvementService } from './mouvement.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('MouvementService', () => {
  let service: MouvementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule,RouterTestingModule],
      providers: [MouvementService]
    });
    service = TestBed.inject(MouvementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
