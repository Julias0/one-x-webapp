import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NextStepDto } from 'src/app/models/next-step.dto';
import { NextStepsService } from 'src/app/services/next-steps.service';
import { PageDataService } from 'src/app/services/page-data.service';

@Component({
  selector: 'app-next-steps',
  templateUrl: './next-steps.component.html',
  styleUrls: ['./next-steps.component.scss']
})
export class NextStepsComponent implements OnInit {

  nextSteps$: Observable<NextStepDto[]>;
  loadData$: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(
    private nextStepsService: NextStepsService,
    private pageDataService: PageDataService
  ) {
    this.nextSteps$ = this.loadData$.pipe(
      switchMap(() => this.nextStepsService.getNextSteps()),
      map(nextSteps => nextSteps.sort((a, b) => b.status === a.status? 1: -1))
    )
  }

  ngOnInit(): void {
    this.pageDataService.setTitle('Next Steps');
  }

  markComplete(step: NextStepDto) {
    console.log(step);
    this.nextStepsService.completeStep(step).subscribe(() => {
      this.loadData$.next({});
    });
  }

}
