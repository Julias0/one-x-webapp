import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingsService } from 'src/app/services/meetings.service';
import { PageDataService } from 'src/app/services/page-data.service';

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

  constructor(
    private meetingsService: MeetingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageDataService: PageDataService,
  ) { }

  ngOnInit(): void {
    this.previewTemplate = this.meetingsService.getTempates()[this.activatedRoute.snapshot.params.templateIndex];
    this.pageDataService.setTitle('Preview Template');
  }

  proceedWithPreviewedTemplate() {
    this.router.navigate(['/', 'app', 'create_meeting', { template_index: this.activatedRoute.snapshot.params.templateIndex }]);
  }

  goBack() {
    this.router.navigate(['/', 'app', 'templates'])
  }

}
