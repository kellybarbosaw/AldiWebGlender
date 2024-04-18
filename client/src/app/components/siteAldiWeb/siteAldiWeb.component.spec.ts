import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAldiWebComponent } from './siteAldiWeb.component';

describe('SiteAldiWebComponent', () => {
  let component: SiteAldiWebComponent;
  let fixture: ComponentFixture<SiteAldiWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteAldiWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteAldiWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
