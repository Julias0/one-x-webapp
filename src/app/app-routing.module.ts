import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { NextStepsComponent } from './pages/next-steps/next-steps.component';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
