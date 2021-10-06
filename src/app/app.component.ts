import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './backend/interfaces/user.interface';
import { GlobalVariables } from './common/global-variables';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Community-Forum';
  onRegister:boolean = false;
  onLogin:boolean = false;

  currentUser:User = this.globals.defaultUser;

  subscription:Subscription = new Subscription;

  constructor(private loginService:LoginService, public globals:GlobalVariables) { }

  ngOnInit() {
    this.subscription = this.loginService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
