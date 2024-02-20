import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaStatusComponent } from './tarefa-status.component';

describe('TarefaStatusComponent', () => {
  let component: TarefaStatusComponent;
  let fixture: ComponentFixture<TarefaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarefaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
