import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingsService } from 'src/app/services/meetings.service';
import { PageDataService } from 'src/app/services/page-data.service';

type Template = {
  header: string;
  content: string;
  longContent: string;
  questions: string[];
}

@Component({
  selector: 'app-choose-meeting-template',
  templateUrl: './choose-meeting-template.component.html',
  styleUrls: ['./choose-meeting-template.component.scss']
})
export class ChooseMeetingTemplateComponent implements OnInit {

  enter(i: number) {
    this.hoverIndex = i;
  }

  leave(i: number) {
    this.hoverIndex = null;
  }

  hoverIndex: number | null = null;

  templates: Template[] = [];

  constructor(
    private meetingsService: MeetingsService,
    private router: Router,
    private pageDataService: PageDataService
  ) { }

  ngOnInit(): void {
    this.templates = this.meetingsService.getTempates();
    this.pageDataService.setTitle('Choose Template');
  }
  
  previewTempalte(index: number) {
    this.router.navigate(['/', 'app', 'preview', index]);
  }

  selectTemplate(index: number) {
    this.router.navigate(['/', 'app', 'create_meeting', { template_index: index }]);
  }
}
