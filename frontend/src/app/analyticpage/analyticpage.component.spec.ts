import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticpageComponent } from './analyticpage.component';

describe('AnalyticpageComponent', () => {
  let component: AnalyticpageComponent;
  let fixture: ComponentFixture<AnalyticpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
