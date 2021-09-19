import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-classification',
  templateUrl: './question-classification.component.html',
  styleUrls: ['./question-classification.component.scss']
})
export class QuestionClassificationComponent implements OnInit {

  @Input() question?: string;
  classifiedLabel?: string;

  constructor(
    private questionsService: QuestionsService
  ) { }

  ngOnInit(): void {
    if (this.question) {
      this.questionsService.classifyQuestion(this.question).subscribe(classifications => {
        this.classifiedLabel = classifications[0]?.label;
      })      
    }
  }

}
