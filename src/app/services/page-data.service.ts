import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {

  title$ = new BehaviorSubject<string>('');

  constructor() { }

  getTitle() {
    return this.title$.asObservable();
  }

  setTitle(title: string) {
    this.title$.next(title);
  }
}