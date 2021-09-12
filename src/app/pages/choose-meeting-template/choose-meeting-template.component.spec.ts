import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMeetingTemplateComponent } from './choose-meeting-template.component';

describe('ChooseMeetingTemplateComponent', () => {
  let component: ChooseMeetingTemplateComponent;
  let fixture: ComponentFixture<ChooseMeetingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMeetingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMeetingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
