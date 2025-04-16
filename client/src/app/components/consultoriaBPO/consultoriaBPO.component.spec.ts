import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriaBPOComponent } from './consultoriaBPO.component';

describe('ConsultoriaBPOComponent', () => {
  let component: ConsultoriaBPOComponent;
  let fixture: ComponentFixture<ConsultoriaBPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoriaBPOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultoriaBPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
