import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../backend/interfaces/user.interface';
import { UserService } from '../backend/services/user.service';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-profile',
  templateUrl: './forum-profile.component.html',
  styleUrls: ['./forum-profile.component.css']
})
export class ForumProfileComponent implements OnInit {

  userProfile:User = this.globals.defaultUser;

  constructor(private titleService:Title, private route:ActivatedRoute, private userService:UserService,
    private router:Router, public globals:GlobalVariables) { }

  ngOnInit(): void {
    const uname = this.route.snapshot.params["user"];

    // Check if the profile exists
    this.userService.getUser(uname).subscribe(data=> {
      if (data) { // User exists
        this.userProfile = data;
        this.titleService.setTitle(uname+" - "+this.globals.websiteTitle);
      }
      else { // Error
        this.titleService.setTitle(this.globals.websiteTitle+" - Error");
      }
    });
    this.titleService.setTitle(uname+" - "+this.globals.websiteTitle);
  }

}
