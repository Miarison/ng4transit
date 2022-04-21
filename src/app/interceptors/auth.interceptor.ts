import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { urlBase } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 401){
        return this.http.post(`${urlBase}api/refresh`, {}, {
          withCredentials: true
        }).pipe(
          switchMap((res: any)=>{
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.getToken()}`
              }
            }))
          })
        );
      }
      return throwError(() => err);
    }));
  }
  
  private getToken(): string|null{
    return localStorage.getItem('id_token');
  }
}
