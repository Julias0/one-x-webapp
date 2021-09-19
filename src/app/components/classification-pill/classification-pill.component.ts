import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-classification-pill',
  templateUrl: './classification-pill.component.html',
  styleUrls: ['./classification-pill.component.scss']
})
export class ClassificationPillComponent implements OnInit {

  @Input() questionClassification?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
