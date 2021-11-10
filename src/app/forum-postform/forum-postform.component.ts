import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../common/global-variables';
import { UserService } from '../backend/services/user.service';
import { ForumsService } from '../backend/services/forums.service';
import { Title } from '@angular/platform-browser';
import { User } from '../backend/interfaces/user.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forum-postform',
  templateUrl: './forum-postform.component.html',
  styleUrls: ['./forum-postform.component.css']
})
export class ForumPostformComponent implements OnInit {

  // Logged in user
  currentUser:User = this.globals.defaultUser;
  // Sub-category name
  subCategoryName:string = "";

  constructor(public globals:GlobalVariables, private userService:UserService, private forumService:ForumsService,
    private titleService:Title, private router:Router) { }

  ngOnInit(): void {
    // Get user details
    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.currentUser = data;

      // Navigate to login screen if the user is not logged in
      if (this.currentUser === this.globals.defaultUser) {
        this.router.navigateByUrl("/login");
        return;
      }
    });
    // Convert the url into a string that which we can identify the subcategory name
    let subvars = this.router.url.split("/");
    subvars.pop();
    subvars.splice(0, 2);

    this.subCategoryName = subvars.join();

    this.titleService.setTitle("Post thread | " + this.globals.websiteTitle);
  }

  // Form submit function
  postThread(postRef:NgForm): void {
    let postForm = postRef.value;

    // Create the ForumPost object
    const forumObj = {
      title: postForm.postTitle, 
      author: this.currentUser.username, 
      content: postForm.postContent
    };

    // Post the thread to the sub-category
    // TODO: Allow for posting to a subject in
    //       the sub-category.
    this.forumService.addPostToSubcategory(this.subCategoryName, forumObj).subscribe(()=> {
      alert("Posted.");
    },
    error=> {
      console.log(error);
    });
  }

}
