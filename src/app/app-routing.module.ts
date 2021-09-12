import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ChooseMeetingTemplateComponent } from './pages/choose-meeting-template/choose-meeting-template.component';
import { CreateMeetingComponent } from './pages/create-meeting/create-meeting.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { NextStepsComponent } from './pages/next-steps/next-steps.component';
import { PreviewTemplateComponent } from './pages/preview-template/preview-template.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/sign_in' },
  {
    path: 'sign_in',
    component: SignInComponent
  },
  {
    path: 'sign_up',
    component: SignUpComponent
  },
  {
    path: 'reset_password',
    component: ResetPasswordComponent
  },
  {
    path: 'new_password',
    component: NewPasswordComponent
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: LayoutComponent,

    children: [
      {
        path: 'meetings',
        component: MeetingsComponent
      },
      {
        path: 'next_steps',
        component: NextStepsComponent
      },
      {
        path: 'templates',
        component: ChooseMeetingTemplateComponent
      },
      {
        path: 'preview/:templateIndex',
        component: PreviewTemplateComponent
      },
      {
        path: 'create_meeting',
        component: CreateMeetingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
