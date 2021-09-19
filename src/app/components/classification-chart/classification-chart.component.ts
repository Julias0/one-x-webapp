import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-classification-chart',
  templateUrl: './classification-chart.component.html',
  styleUrls: ['./classification-chart.component.scss']
})
export class ClassificationChartComponent implements OnInit {

  @Input() questionClassificationsAggregate: {
    label: string;
    count: number;
  }[] = [];

  radarChartOptions: RadialChartOptions = {
  };
  radarChartLabels: Label[] = [];
  radarChartData: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';


  constructor() { }

  ngOnInit(): void {
    this.radarChartLabels = this.questionClassificationsAggregate.map(questionClassification => questionClassification.label);
    this.radarChartData = [
      {
        data: this.questionClassificationsAggregate.map(questionClassification => questionClassification.count),
        label: 'Meeting Factors'
      }
    ];
  }

}
