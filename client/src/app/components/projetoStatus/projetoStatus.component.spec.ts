import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoStatusComponent } from './projetoStatus.component';

describe('ProjetoStatusComponent', () => {
  let component: ProjetoStatusComponent;
  let fixture: ComponentFixture<ProjetoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
