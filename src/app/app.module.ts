import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AuthGuard } from './guards/auth.guard';
import { HttpConfigInterceptor } from './interceptors/auth.interceptor';
import { NextStepsComponent } from './pages/next-steps/next-steps.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ChooseMeetingTemplateComponent } from './pages/choose-meeting-template/choose-meeting-template.component';
import { PreviewTemplateComponent } from './pages/preview-template/preview-template.component';
import { CreateMeetingComponent } from './pages/create-meeting/create-meeting.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ClassificationPillComponent } from './components/classification-pill/classification-pill.component';
import { QuestionClassificationComponent } from './components/question-classification/question-classification.component';
import { ChartsModule } from 'ng2-charts';
import { ClassificationChartComponent } from './components/classification-chart/classification-chart.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LayoutComponent,
    MeetingsComponent,
    NextStepsComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    ChooseMeetingTemplateComponent,
    PreviewTemplateComponent,
    CreateMeetingComponent,
    ClassificationPillComponent,
    QuestionClassificationComponent,
    ClassificationChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzAvatarModule,
    NzPopoverModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzTimelineModule,
    NzTableModule,
    NzUploadModule,
    NzMessageModule,
    NzInputModule,
    FormsModule,
    NzModalModule,
    NzNotificationModule,
    NzTabsModule,
    NzRadioModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzFormModule,
    NzSwitchModule,
    NzCollapseModule,
    NzTimePickerModule,
    NzCalendarModule,
    NzSelectModule,
    NzListModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzEmptyModule,
    NzDatePickerModule,
    NzBreadCrumbModule,
    NzInputNumberModule,
    NzToolTipModule,
    NzDropDownModule,
    NzAutocompleteModule,
    NzSpinModule,
    NzBadgeModule,
    NzTagModule,
    NzProgressModule,
    NzCommentModule,
    NzStatisticModule,
    NzSliderModule,
    NzSkeletonModule,
    NzAlertModule,
    NzTypographyModule,
    NzDescriptionsModule,
    NzResultModule,
    NzSpaceModule,
    ChartsModule
  ],
  providers: [
    // {
    //   provide: LocationStrategy,
    //   useValue: HashLocationStrategy
    // },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
