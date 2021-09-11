import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateMeetingComponent } from 'src/app/components/create-meeting/create-meeting.component';
import { CreateMeetingState } from 'src/app/components/create-meeting/create-meeting.enum';
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
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.meetings$ = this.loadData$.pipe(
      switchMap(()=> this.meetingsService.getMeetings())
    );
  }

  ngOnInit(): void {
    this.pageDataService.setTitle('Meetings');
  }

  startMeeting() {
    const modal = this.modal.create({
      nzTitle: 'Start Meeting',
      nzContent: CreateMeetingComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
      },
      nzFooter: [],
      nzWidth: '800px'
    });
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      this.loadData$.next({});
    });
  }

}
