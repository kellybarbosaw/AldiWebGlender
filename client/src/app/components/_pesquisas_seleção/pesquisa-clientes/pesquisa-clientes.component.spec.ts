import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaClientesComponent } from './pesquisa-clientes.component';

describe('PesquisaClientesComponent', () => {
  let component: PesquisaClientesComponent;
  let fixture: ComponentFixture<PesquisaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisaClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PesquisaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
