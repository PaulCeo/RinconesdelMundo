import { TestBed } from '@angular/core/testing';

import { TipDataService } from './tip-data.service';

describe('TipDataService', () => {
  let service: TipDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
