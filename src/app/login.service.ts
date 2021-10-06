import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariables } from './common/global-variables';
import { User } from './backend/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSource = new BehaviorSubject(this.globals.defaultUser);
  public currentUser = this.userSource.asObservable();

  constructor(public globals:GlobalVariables) { }

  changeUser(user:User): void {
    this.userSource.next(user);
  }
}
