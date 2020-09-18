import { TestBed } from '@angular/core/testing';

import { TaxiDriverService } from './taxi-driver.service';

describe('TaxiDriverService', () => {
  let service: TaxiDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxiDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
