import { EventEmitter, Injectable } from '@angular/core';
import { SigninModel } from '../model/signin-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { urlBase } from 'src/environments/environment';
import * as moment from "moment";

const URL_BASE = `${urlBase}api/users/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public static onLoggedIn: EventEmitter<any> = new EventEmitter<any>()
  public static onLoggedOut: EventEmitter<any> = new EventEmitter<any>()
  constructor(private http: HttpClient) {
  }

  public authenticate(signinData: SigninModel): Observable<any> {
    return this.checkCredentials(signinData).pipe(tap(data => {
      AuthenticationService.setSession(data);
      AuthenticationService.onLoggedIn.emit(AuthenticationService.getUserData);
    }));
  }

  private checkCredentials(signinData: SigninModel): Observable<any> {
    return this.http.post(URL_BASE, signinData, { withCredentials: true });
  }

  private static setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    AuthenticationService.setUserData(authResult.data);
  }

  public static logout() {
    const userData = AuthenticationService.getUserData();
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    AuthenticationService.onLoggedOut.emit(userData);
  }

  public static isLoggedIn() {
    const expiresIn = AuthenticationService.getExpiration();
    return expiresIn ? moment().isBefore(AuthenticationService.getExpiration()) : false;
  }

  public static isLoggedOut() {
    return !AuthenticationService.isLoggedIn();
  }

  private static getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return undefined;
  }

  public static setUserData(data: any) {
    return localStorage.setItem('user', JSON.stringify(data));
  }

  public static getUserData(): any {
    const userSession = localStorage.getItem('user');
    if (userSession) {
      return JSON.parse(userSession);
    }
    else return {}
  }
}
