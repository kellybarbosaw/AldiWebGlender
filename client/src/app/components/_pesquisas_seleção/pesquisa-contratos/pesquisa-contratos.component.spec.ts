import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaContratosComponent } from './pesquisa-contratos.component';

describe('PesquisaContratosComponent', () => {
  let component: PesquisaContratosComponent;
  let fixture: ComponentFixture<PesquisaContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisaContratosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PesquisaContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
