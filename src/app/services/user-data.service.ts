import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public users: any;
  constructor() { }

  getUserById(id: number): any{
    if(this.users){
      return this.users.filter((user: { id: number; })=>user.id === id)[0];
    }
    return undefined;
  }
}
