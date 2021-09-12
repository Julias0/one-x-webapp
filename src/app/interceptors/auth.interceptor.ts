import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams,
  HttpParameterCodec
} from '@angular/common/http';

import { Observable, throwError, from, forkJoin, of, iif } from 'rxjs';
import { map, catchError, switchMap, mergeMap, concatMap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService
  ) { }

  secureUrl(url: string) {
      if (url.indexOf('onex') >= 0 ||
      url.indexOf('localhost') >= 0 ) {
      return true;
    }
    return false;
  }


  getAccessToken() {
    return of(this.tokenService.getAccessToken());
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return forkJoin({
      token: iif(() => this.secureUrl(request.url), this.getAccessToken(), of(null))
    }).pipe(
        concatMap(({token}) => {
          if (token && this.secureUrl(request.url)) {
            request = request.clone({ headers: request.headers.set('Authorization', token) });
            const params = new HttpParams({encoder: new CustomEncoder(), fromString: request.params.toString()});
            request = request.clone({params});
          }

          return next.handle(request);
        })
      );
  }
}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}