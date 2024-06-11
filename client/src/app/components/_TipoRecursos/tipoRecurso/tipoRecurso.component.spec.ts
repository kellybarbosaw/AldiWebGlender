import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRecursoComponent } from './tipoRecurso.component';

describe('TipoRecursoComponent', () => {
  let component: TipoRecursoComponent;
  let fixture: ComponentFixture<TipoRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoRecursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
