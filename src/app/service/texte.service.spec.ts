import { TestBed } from '@angular/core/testing';

import { TexteService } from './texte.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PhaseService} from "./phase.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('TexteService', () => {
  let service: TexteService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule,RouterTestingModule],
      providers: [TexteService]
    });
    service = TestBed.inject(TexteService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
