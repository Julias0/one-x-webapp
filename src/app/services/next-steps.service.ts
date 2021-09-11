import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NextStepDto } from '../models/next-step.dto';

@Injectable({
  providedIn: 'root'
})
export class NextStepsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getNextSteps() {
    return this.httpClient.get<NextStepDto[]>(environment.ROOT_URL + '/next-steps');
  }

  completeStep(nextStep: NextStepDto) {
    return this.httpClient.post(environment.ROOT_URL + `/next-steps/${nextStep._id}/complete`, {});
  }
}
