import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setAccessToken(accessToken: string) {
    localStorage.setItem('X-AUTH-TOKEN', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('X-AUTH-TOKEN');
  }

  removeAccessToken() {
    localStorage.removeItem('X-AUTH-TOKEN');
  }
}
