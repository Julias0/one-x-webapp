import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { noop } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MeetingDto } from 'src/app/models/meeting.dto';
import { MeetingsService } from 'src/app/services/meetings.service';
import { PageDataService } from 'src/app/services/page-data.service';

type Template = {
  header: string;
  content: string;
  longContent: string;
  questions: string[];
}

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  fg!: FormGroup;
  activeTemplate?: Template;
  formQuestionEditMap: { [index: number]: boolean } = {};

  formNoteEditMap: { [index: number]: boolean } = {};

  formNextStepsEditMap: { [index: number]: boolean } = {};

  constructor(
    private meetingsService: MeetingsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageDataService: PageDataService
  ) { }

  get meetingItems() {
    return this.fg.controls['meetingItems'] as FormArray;
  }

  ngOnInit(): void {
    this.pageDataService.setTitle('Meeting Details');
    const templates = this.meetingsService.getTempates();
    this.fg = this.fb.group({
      name: [, Validators.required],
      withWhom: [],
      meetingItems: this.fb.array([])
    });

    if (this.activatedRoute.snapshot.params.template_index) {
      this.activeTemplate = templates[this.activatedRoute.snapshot.params.template_index];
      this.selectTemplate(templates[this.activatedRoute.snapshot.params.template_index]);
    }
  }

  goToTemplate() {
    this.router.navigate(['/', 'app', 'preview', this.activatedRoute.snapshot.params.template_index]);
  }

  cast(a: AbstractControl) {
    return a as FormGroup;
  }

  addMeetingItem(question: string) {
    const meetingItemFg = this.fb.group({
      question: [question, Validators.required],
      notes: [''],
      nextSteps: []
    });

    this.meetingItems.push(meetingItemFg);
  }

  addMeetingItemAtIndex(index: number): void {
    const meetingItemFg = this.fb.group({
      question: ['', Validators.required],
      notes: [''],
      nextSteps: []
    });

    this.meetingItems.insert(index, meetingItemFg);

    const newMapValues:any = {};
    Object.keys(this.formQuestionEditMap).forEach((key) => {
      if(+key >= index) {
        newMapValues[+key+1] = this.formQuestionEditMap[+key];
      }
    });

    this.formQuestionEditMap = { ...this.formQuestionEditMap, ...newMapValues };
    this.formQuestionEditMap[index] = true;
  }

  deleteMeetingItem(meetingItemIndex: number) {
    this.meetingItems.removeAt(meetingItemIndex);
  }

  selectTemplate(selectedTemplate: Template) {
    const todayDate = new Date();
    this.fg.controls.name.setValue(`${selectedTemplate.header}(${todayDate.getDate()}/${todayDate.getMonth()}/${todayDate.getFullYear()})`)

    selectedTemplate.questions.forEach(question => {
      this.addMeetingItem(question);
    });
  }

  convertFgToValue(formValue: any): MeetingDto {
    const newMeeting: MeetingDto = {
      name: formValue.name,
      withWhom: formValue.withWhom,
      meetingItems: formValue.meetingItems.map((meetingItem: { question: string, notes: string, nextSteps: string[] }) => ({
        content: meetingItem.question,
        notes: meetingItem.notes,
        nextSteps: meetingItem.nextSteps
      }))
    };

    return newMeeting;
  }

  submitForm() {
    if (this.fg.valid) {
      console.log(this.fg.value);
      const newMeetingDto = this.convertFgToValue(this.fg.value);
      this.meetingsService.createMeeting(newMeetingDto).pipe(
        finalize(() => {
          this.router.navigate(['/', 'app', 'meetings']);
        })
      ).subscribe(noop)
    } else {
      this.fg.markAllAsTouched();
    }
  }

}
