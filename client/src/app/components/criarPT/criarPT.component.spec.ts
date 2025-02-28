import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPTComponent } from './criarPTcomponent';

describe('CriarPTComponent', () => {
  let component: CriarPTComponent;
  let fixture: ComponentFixture<CriarPTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarPTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
