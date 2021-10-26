import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../backend/interfaces/user.interface';
import { UserService } from '../backend/services/user.service';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-adminpanel',
  templateUrl: './forum-adminpanel.component.html',
  styleUrls: ['./forum-adminpanel.component.css']
})
export class ForumAdminpanelComponent implements OnInit {

  currentUser:User = this.globals.defaultUser;

  constructor(private titleService:Title, private userService:UserService, private router:Router, 
    public globals:GlobalVariables) { }

  ngOnInit(): void {
    // When the user is not logged in, redirect
    if (!window.localStorage.getItem('forum_login') && !window.sessionStorage.getItem('forum_login')) {
      this.router.navigateByUrl("/error");
      return;
    }

    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.currentUser = data;

      if (data.privilege < 253) {
        this.router.navigateByUrl("/error");
      }
    });
    this.titleService.setTitle(this.globals.websiteTitle+" - Admin Panel");
  }

}
