import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionClassificationComponent } from './question-classification.component';

describe('QuestionClassificationComponent', () => {
  let component: QuestionClassificationComponent;
  let fixture: ComponentFixture<QuestionClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
