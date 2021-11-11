import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../common/global-variables';
import { Title } from '@angular/platform-browser';
import { UserService } from '../backend/services/user.service';
import { ForumpostService } from '../backend/services/forumpost.service';
import { Router } from '@angular/router';
import { ForumPost } from '../backend/interfaces/forumpost.interface';
import { User } from '../backend/interfaces/user.interface';
import { ForumComment } from '../backend/interfaces/forumcomment.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent implements OnInit {

  // Post data
  postData:any;
  postUser:User = this.globals.defaultUser;
  // Current user
  currentUser:User = this.globals.defaultUser;

  constructor(public globals:GlobalVariables, private titleService:Title, private userService:UserService,
    private router:Router, private forumPostService:ForumpostService) { }

  ngOnInit(): void {
    // Get the thread ID from the url
    const thNumber = this.router.url.split("/").pop();

    if (thNumber != undefined) {
      // Convert the thread string to a readable number
      const threadId:number = +thNumber;

      // Get the post data from the corresponding thread id
      this.forumPostService.getPost(threadId).subscribe(data=> {
        this.postData = data;
        this.titleService.setTitle(data.title + " | " + this.globals.websiteTitle);

        // Get the user from the post
        this.userService.getUser(data.author).subscribe(userData=> {
          this.postUser = userData;
        });

      });
    }

    // Get the current logged in user details
    const logName = this.globals.getCurrentUserDetails();
    
    if (logName !== "") {
      this.userService.getUser(logName).subscribe(data=> {
        this.currentUser = data;
      });
    }
  }

  makeComment(commentRef:NgForm): void {
    
  }

}
