import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './backend/interfaces/user.interface';
import { UserService } from './backend/services/user.service';
import { GlobalVariables } from './common/global-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Community-Forum';
  onRegister:boolean = false;
  onLogin:boolean = false;

  // Holds the information about the logged in user
  currentUser:User = this.globals.defaultUser;

  constructor(private userService:UserService, private router:Router, public globals:GlobalVariables) { }

  ngOnInit() {
    const logger = window.localStorage.getItem('forum_login');
    const logger2 = window.sessionStorage.getItem('forum_login');
    // Attempt to figure out if the user is already logged in
    if (typeof logger==='string') {
      this.userService.getUser(logger.toString()).subscribe(data=> {
        this.currentUser = data;
      },
      err=> {
        this.logoutUser();
      });
    }
    else if (typeof logger2==='string') {
      this.userService.getUser(logger2.toString()).subscribe(data=> {
        this.currentUser = data;
      },
      err=> {
        this.logoutUser();
      });
    }
  }

  // Function for when the user clicks their name
  nameClick(): void {
    this.router.navigateByUrl("/members/"+this.currentUser.username).then(()=> {
      window.location.reload();
    });
  }

  // Logout button function
  logoutUser(): void {
    window.localStorage.removeItem('forum_login');
    window.sessionStorage.removeItem('forum_login');
    location.reload();
  }

}
