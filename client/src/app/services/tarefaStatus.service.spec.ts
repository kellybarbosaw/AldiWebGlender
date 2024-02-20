import { TestBed } from '@angular/core/testing';

import { TarefaStatusService } from './tarefaStatus.service';

describe('TarefaStatusService', () => {
  let service: TarefaStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarefaStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
