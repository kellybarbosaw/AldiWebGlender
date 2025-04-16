import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriaFluigComponent } from './consultoriaFluig.component';

describe('ConsultoriaFluigComponent', () => {
  let component: ConsultoriaFluigComponent;
  let fixture: ComponentFixture<ConsultoriaFluigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoriaFluigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultoriaFluigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
