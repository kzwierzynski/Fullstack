import { TestBed, inject } from '@angular/core/testing';

import { GetRatesService } from './get-rates.service';

describe('GetRatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRatesService]
    });
  });

  it('should be created', inject([GetRatesService], (service: GetRatesService) => {
    expect(service).toBeTruthy();
  }));
});
