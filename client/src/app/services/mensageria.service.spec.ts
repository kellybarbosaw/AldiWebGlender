import { TestBed } from '@angular/core/testing';

import { MensageriaService } from './mensageria.service';

describe('MensageriaService', () => {
  let service: MensageriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensageriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
