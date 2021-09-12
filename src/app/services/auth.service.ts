import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SignInDto } from '../models/sign-in.dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getUser() {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(this.tokenService.getAccessToken() || undefined);
  }

  signIn(email: string, password: string) {
    return this.httpClient.post<SignInDto>(environment.ROOT_URL + '/auth/sign_in', {
      email,
      password
    }).pipe(
      tap(signInResponse => {
        this.tokenService.setAccessToken(signInResponse.accessToken);
        return signInResponse;
      })
    );
  }

  signUp(email: string, password: string) {
    return this.httpClient.post<SignInDto>(environment.ROOT_URL + '/auth/sign_up', {
      email,
      password
    }).pipe(
      tap(signInResponse => {
        this.tokenService.setAccessToken(signInResponse.accessToken);
        return signInResponse;
      })
    );
  }

  requestResetPassword(email: string) {
    return this.httpClient.post(environment.ROOT_URL + '/auth/reset_password', {
      email
    });
  }

  resetPassword(password: string) {
    return this.httpClient.post(environment.ROOT_URL + '/auth/new_password', {
      password
    });
  }

  logout() {
    this.tokenService.removeAccessToken();
  }
}
