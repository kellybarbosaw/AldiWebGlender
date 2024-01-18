import { TestBed } from '@angular/core/testing';

import { Client360Service } from './client360.service';

describe('Client360Service', () => {
  let service: Client360Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Client360Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
