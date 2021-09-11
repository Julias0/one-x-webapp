import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NextStepDto } from 'src/app/models/next-step.dto';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NextStepsService } from 'src/app/services/next-steps.service';
import { PageDataService } from 'src/app/services/page-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  user$: Observable<User>;
  profilePic$: Observable<string|null>;
  title = '';
  nextSteps$: Observable<NextStepDto[]>;

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private pageDataService: PageDataService,
    private router: Router,
    private nextStepService: NextStepsService
  ) {
    this.user$ = this.userService.getMyUserDetails().pipe(shareReplay(1));
    this.profilePic$ = this.user$.pipe(map(user => this.userService.getGravatarImage(user.email)));
    this.nextSteps$ = this.nextStepService.getNextSteps().pipe(shareReplay(1));
  }

  ngOnInit(): void {
    this.pageDataService.getTitle().subscribe(title => {
      this.title = title;
      this.changeDetectorRef.detectChanges();
    });

    this.nextSteps$.subscribe(console.log);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/', 'sign_in']);
  }

  completeNextStep(step: NextStepDto) {
    console.log(step);
  }
}
