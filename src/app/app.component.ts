import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ForumMessage } from './backend/interfaces/forummessage.interface';
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
  notifications:Array<ForumMessage> = [];

  constructor(private userService:UserService, private router:Router, public globals:GlobalVariables) { }

  // Logs the user in
  loginUser(details:User): void {
    this.currentUser = details;
    // Grab the user notifications
    details.messages?.forEach(element=> {
      this.notifications.push(element);
    });
    // Sort them by newest first
    this.notifications.sort(function(a,b) {
      const adate = new Date(Date.parse(a.dateSent.toString()));
      const bdate = new Date(Date.parse(b.dateSent.toString()));
      return bdate.getTime() - adate.getTime();
    });
  }

  ngOnInit() {
    const logger = window.localStorage.getItem('forum_login');
    const logger2 = window.sessionStorage.getItem('forum_login');
    // Attempt to figure out if the user is already logged in
    if (typeof logger==='string') {
      this.userService.getUser(logger.toString()).subscribe(data=> {
        this.loginUser(data);
      },
      err=> {
        this.logoutUser();
      });
    }
    else if (typeof logger2==='string') {
      this.userService.getUser(logger2.toString()).subscribe(data=> {
        this.loginUser(data);
      },
      err=> {
        this.logoutUser();
      });
    }
  }

  // Activates when the user clicks a message
  displayMessage(msgValue:ForumMessage, msgIndex:number): void {
    this.router.navigateByUrl(msgValue.linkUrl);
    this.notifications[msgIndex].isRead = true;
    this.currentUser.messages = this.notifications;

    this.userService.updateUserDetails(this.currentUser.username, this.currentUser).subscribe(res=> {

    });
  }

  // Gets the total amount of messages that haven't been read yet
  getTotalUnread(): number {
    let result = 0;
    this.notifications.forEach(element=> {
      if (element.isRead==false)
        result++;
    });
    return result;
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
