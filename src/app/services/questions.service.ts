import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { concatMap, map, reduce } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClassifyQuestionDto } from '../models/classify-question.dto';
import { Cacheable } from 'ts-cacheable';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  @Cacheable()
  classifyQuestion(question: string) {
    return this.httpClient.post<ClassifyQuestionDto[]>(environment.ROOT_URL + '/classify_question', { 
      question
    }).pipe(
      map(res => res.map(classificationLabel => ({ label: classificationLabel._label, confidence: classificationLabel._confidence })))
    );
  }

  @Cacheable()
  classifyManyQuestions(questions: string[]) {
    return from(questions).pipe(
      concatMap(question => this.classifyQuestion(question)),
      reduce((acc, curr) => {
        return acc.concat(curr[0]);
      }, [] as { label: string, confidence: number}[])
    )
  }

  getClassifiedQuestionAggregate(questionClassifications: {label: string}[]) {
    return questionClassifications.reduce((acc, curr) => {
      const existingAggregate = acc.find(aggregate => aggregate.label === curr?.label);
      if (existingAggregate) {
        existingAggregate.count++;
      } 
      return acc;
    }, [
      {
        label: 'growth and development',
        count: 0
      },
      {
        label: 'communication',
        count: 0
      },
      {
        label: 'challenges and roadblocks',
        count: 0
      },
      {
        label: 'feedback',
        count: 0
      }
    ] as { label: string, count: number}[]
    );
  }

}
