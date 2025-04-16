import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriaRMComponent } from './consultoriaRM.component';

describe('ConsultoriaRMComponent', () => {
  let component: ConsultoriaRMComponent;
  let fixture: ComponentFixture<ConsultoriaRMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoriaRMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultoriaRMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
