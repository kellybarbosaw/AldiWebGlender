import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AldiwebsiteComponent } from './aldiwebsite.component';

describe('AldiwebsiteComponent', () => {
  let component: AldiwebsiteComponent;
  let fixture: ComponentFixture<AldiwebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AldiwebsiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AldiwebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
