import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRecursosComponent } from './tipoRecursos.component';

describe('TipoRecursosComponent', () => {
  let component: TipoRecursosComponent;
  let fixture: ComponentFixture<TipoRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoRecursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
