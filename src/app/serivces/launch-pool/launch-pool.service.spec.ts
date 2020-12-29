import { TestBed } from '@angular/core/testing';

import { LaunchPoolService } from './launch-pool.service';

describe('LaunchPoolService', () => {
  let service: LaunchPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
