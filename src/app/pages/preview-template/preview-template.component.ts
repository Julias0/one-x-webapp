import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, of } from 'rxjs';
import { concatMap, reduce, tap } from 'rxjs/operators';
import { MeetingsService } from 'src/app/services/meetings.service';
import { PageDataService } from 'src/app/services/page-data.service';
import { QuestionsService } from 'src/app/services/questions.service';

type Template = {
  header: string;
  content: string;
  longContent: string;
  questions: string[];
}
@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.scss']
})
export class PreviewTemplateComponent implements OnInit {

  previewTemplate!: Template;
  questionClassifications: {
    label: string;
    confidence: number;
  }[] = [];
  loadingAnalysis = true;
  questionClassificationsAggregate: { label: string; count: number}[] = [];

  constructor(
    private meetingsService: MeetingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageDataService: PageDataService,
    private questionsService: QuestionsService,
  ) { }

  ngOnInit(): void {
    this.previewTemplate = this.meetingsService.getTempates()[this.activatedRoute.snapshot.params.templateIndex];
    this.loadingAnalysis = true;

    this.questionsService.classifyManyQuestions(this.previewTemplate.questions)
      .subscribe((questionClassifications) => {
        this.questionClassifications = questionClassifications;
        this.questionClassificationsAggregate = this.questionsService.getClassifiedQuestionAggregate(questionClassifications);

        this.loadingAnalysis = false;
      });

    this.pageDataService.setTitle('Preview Template');
  }

  proceedWithPreviewedTemplate() {
    this.router.navigate(['/', 'app', 'create_meeting', { template_index: this.activatedRoute.snapshot.params.templateIndex }]);
  }

  goBack() {
    this.router.navigate(['/', 'app', 'templates'])
  }

}
