import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { urlBase } from 'src/environments/environment';


const SCHEDULE_BASE_URL = `${urlBase}api/schedules/`;
const MY_SCHEDULE_URL = `${urlBase}api/schedules/user/`;


@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  constructor(private http: HttpClient) { }

  public getSchedules(): Observable<any> | undefined {
    return this.http.get<object>(SCHEDULE_BASE_URL).pipe(
      tap(schedule => console.log('schedule: ', schedule)),
      catchError(this.handleError)
    );
  }

  public getMySchedules(userId: number): Observable<any> | undefined {
    return this.http.get<object>(`${MY_SCHEDULE_URL}${userId}`).pipe(
      tap(schedule => console.log('schedule: ', schedule)),
      catchError(this.handleError)
    );
  }
  
  public createSchedule(schedule: object): Observable<object> | undefined {
    return this.http.post<any>(SCHEDULE_BASE_URL, schedule).pipe(
      tap(schedule => console.log('schedule: ', schedule)),
      catchError(this.handleError)
    );
  }
  public updateSchedule(schedule: object): Observable<object> | undefined {
    return this.http.patch<any>(SCHEDULE_BASE_URL, schedule).pipe(
      tap(schedule => console.log('schedule: ', schedule)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ' + error.status + ', body was: ' + error.error
      );
    }

    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
