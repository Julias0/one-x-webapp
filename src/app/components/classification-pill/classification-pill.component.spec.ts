import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationPillComponent } from './classification-pill.component';

describe('ClassificationPillComponent', () => {
  let component: ClassificationPillComponent;
  let fixture: ComponentFixture<ClassificationPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationPillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
