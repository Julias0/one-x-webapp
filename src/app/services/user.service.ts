import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import md5 from 'blueimp-md5';
import { Cacheable } from 'ts-cacheable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  @Cacheable()
  getMyUserDetails() {
    return this.httpClient.get<User>(environment.ROOT_URL + '/me');
  }

  getGravatarImage(email: string) {
    return 'http://www.gravatar.com/avatar/' + md5(email);
  }
}
