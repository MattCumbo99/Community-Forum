import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../backend/interfaces/user.interface';
import { UserService } from '../backend/services/user.service';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-members',
  templateUrl: './forum-members.component.html',
  styleUrls: ['./forum-members.component.css']
})
export class ForumMembersComponent implements OnInit {

  members:Array<User> = [];

  constructor(private titleService:Title, private userService:UserService, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Members");
    // Load the list of users
    this.userService.getAllUsers().subscribe(data=> {
      data.forEach(element=> {
        this.members.push(element);
      });
    });
  }

}
