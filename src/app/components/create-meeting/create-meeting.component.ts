import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { noop } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MeetingDto } from 'src/app/models/meeting.dto';
import { MeetingsService } from 'src/app/services/meetings.service';
import { CreateMeetingState } from './create-meeting.enum';

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

  enter(i: number) {
    this.hoverIndex = i;
  }

  leave(i: number) {
    this.hoverIndex = null;
  }

  hoverIndex: number | null = null;
  activeState: CreateMeetingState = CreateMeetingState.TEMPLATE;
  templates: Template[] = [];
  previewTemplate: Template | null = null;
  selectedTemplate: Template | null = null;

  fg!: FormGroup;

  constructor(
    private meetingsService: MeetingsService,
    private fb: FormBuilder,
    private modal: NzModalRef
  ) { }

  get meetingItems() {
    return this.fg.controls['meetingItems'] as FormArray;
  }

  ngOnInit(): void {
    this.templates = this.meetingsService.getTempates();
    this.fg = this.fb.group({
      name: [, Validators.required],
      meetingItems: this.fb.array([])
    });
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

  deleteMeetingItem(meetingItemIndex: number) {
    this.meetingItems.removeAt(meetingItemIndex);
  }

  selectTemplate(selectedTemplate: Template) {
    this.activeState = CreateMeetingState.DETAILS;
    this.selectedTemplate = selectedTemplate;

    const todayDate = new Date();
    this.fg.controls.name.setValue(`${selectedTemplate.header}(${todayDate.getDate()}/${todayDate.getMonth()}/${todayDate.getFullYear()})`)

    this.selectedTemplate.questions.forEach(question => {
      this.addMeetingItem(question);
    });
  }

  previewTempalte(selectedTemplate: Template) {
    this.activeState = CreateMeetingState.PREVIEW;
    this.previewTemplate = selectedTemplate;
  }

  goBack() {
    this.activeState = CreateMeetingState.TEMPLATE;
    this.previewTemplate = null;
    this.fg.reset();
    this.meetingItems.clear();
    this.selectedTemplate = null;
  }

  proceedWithPreviewedTemplate() {
    if (this.previewTemplate) {
      this.selectTemplate(this.previewTemplate);
    }

    this.previewTemplate = null;
  }

  convertFgToValue(formValue: any): MeetingDto {
    const newMeeting: MeetingDto = {
      name: formValue.name,
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
          this.modal.destroy();
        })
      ).subscribe(noop)
    } else {
      this.fg.markAllAsTouched();
    }
  }


}
