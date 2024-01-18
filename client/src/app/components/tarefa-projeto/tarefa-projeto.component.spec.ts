import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaProjetoComponent } from './tarefa-projeto.component';

describe('TarefaProjetoComponent', () => {
  let component: TarefaProjetoComponent;
  let fixture: ComponentFixture<TarefaProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaProjetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarefaProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
