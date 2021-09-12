import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MeetingDto } from 'src/app/models/meeting.dto';
import { MeetingsService } from 'src/app/services/meetings.service';
import { PageDataService } from 'src/app/services/page-data.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  expandSet = new Set<string>();
  onExpandChange(id?: string, checked?: boolean): void {
    if (checked) {
      this.expandSet.add(id || '');
    } else {
      this.expandSet.delete(id || '');
    }
  }

  loadData$: BehaviorSubject<{}> = new BehaviorSubject({});
  meetings$: Observable<MeetingDto[]>;

  constructor(
    private pageDataService: PageDataService,
    private meetingsService: MeetingsService,
  ) {
    this.meetings$ = this.loadData$.pipe(
      switchMap(()=> this.meetingsService.getMeetings())
    );
  }

  ngOnInit(): void {
    this.pageDataService.setTitle('Meetings');
  }
}
