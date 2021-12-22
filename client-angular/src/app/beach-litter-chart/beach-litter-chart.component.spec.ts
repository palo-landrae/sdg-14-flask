import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachLitterChartComponent } from './beach-litter-chart.component';

describe('BeachLitterChartComponent', () => {
  let component: BeachLitterChartComponent;
  let fixture: ComponentFixture<BeachLitterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeachLitterChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachLitterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
