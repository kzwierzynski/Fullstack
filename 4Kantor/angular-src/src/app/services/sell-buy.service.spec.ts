import { TestBed, inject } from '@angular/core/testing';

import { SellBuyService } from './sell-buy.service';

describe('SellBuyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellBuyService]
    });
  });

  it('should be created', inject([SellBuyService], (service: SellBuyService) => {
    expect(service).toBeTruthy();
  }));
});
