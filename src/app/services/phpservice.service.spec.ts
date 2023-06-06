import { TestBed } from '@angular/core/testing';

import { PhpserviceService } from './phpservice.service';

describe('PhpserviceService', () => {
  let service: PhpserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhpserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
