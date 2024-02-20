import { TestBed } from '@angular/core/testing';

import { ProjetoTarefaService } from './projetoTarefa.service';

describe('ProjetoTarefaService', () => {
  let service: ProjetoTarefaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoTarefaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
