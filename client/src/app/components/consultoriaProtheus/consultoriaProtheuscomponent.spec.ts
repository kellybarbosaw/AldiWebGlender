import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriaProtheusComponent } from './consultoriaProtheus.component';

describe('ConsultoriaProtheusComponent', () => {
  let component: ConsultoriaProtheusComponent;
  let fixture: ComponentFixture<ConsultoriaProtheusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoriaProtheusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultoriaProtheusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
