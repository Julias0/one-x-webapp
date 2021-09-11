import { TestBed } from '@angular/core/testing';

import { NextStepsService } from './next-steps.service';

describe('NextStepsService', () => {
  let service: NextStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
