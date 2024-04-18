import { TestBed } from '@angular/core/testing';

import { ProjetoStatusService } from './projetoStatus.service';

describe('ProjetoStatusService', () => {
  let service: ProjetoStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
