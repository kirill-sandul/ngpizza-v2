import { TestBed } from '@angular/core/testing';

import { OrderPopupService } from './order-popup.service';

describe('OrderPopupService', () => {
  let service: OrderPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
