import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationChartComponent } from './classification-chart.component';

describe('ClassificationChartComponent', () => {
  let component: ClassificationChartComponent;
  let fixture: ComponentFixture<ClassificationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
