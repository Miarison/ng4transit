import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { urlBase } from 'src/environments/environment';

const URL_GET = `${urlBase}api/scheduleStages/`
@Injectable({
  providedIn: 'root'
})
export class ScheduleStagesService {

  constructor(private http: HttpClient) { }

  getScheduleStages(): Observable<any>{
    return this.http.get(URL_GET).pipe(tap(), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code '+error.status+', body was: '+error.error
      );
    }

    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
