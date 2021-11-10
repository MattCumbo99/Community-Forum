import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../common/global-variables';
import { UserService } from '../backend/services/user.service';
import { ForumsService } from '../backend/services/forums.service';
import { ForumpostService } from '../backend/services/forumpost.service';
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
  // Name of the category which contains the sub-category
  categoryName:string = "";
  // Sub-category name
  subCategoryName:string = "";

  constructor(public globals:GlobalVariables, private userService:UserService, private forumService:ForumsService,
    private titleService:Title, private router:Router, private forumPostService:ForumpostService) { }

  ngOnInit(): void {
    // Convert the url into a string that which we can identify the subcategory name
    let subvars = this.router.url.split("/");
    subvars.pop();
    subvars.splice(0, 2);

    this.subCategoryName = subvars.join();

    // Check if the sub category name is valid
    this.forumService.getCategoryBySubcategory(this.subCategoryName).subscribe(data=> {
      if (!data) {
        this.router.navigateByUrl("/error");
        return;
      }
      this.categoryName = data.name;
    });

    // Get user details
    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.currentUser = data;

      // Navigate to login screen if the user is not logged in
      if (this.currentUser === this.globals.defaultUser) {
        this.router.navigateByUrl("/login");
        return;
      }
    });

    this.titleService.setTitle("Post thread | " + this.globals.websiteTitle);
  }

  // Form submit function
  postThread(postRef:NgForm): void {
    let postForm = postRef.value;

    // Create the ForumPost object
    const forumObj = {
      postId: new Date().getMilliseconds(),
      title: postForm.postTitle, 
      author: this.currentUser.username, 
      content: postForm.postContent,
      subcategory: this.subCategoryName
    };

    // Post the thread to the sub-category
    // TODO: Allow for posting to a subject in
    //       the sub-category.
    this.forumPostService.createPost(forumObj).subscribe(()=> {
      this.forumService.addPostToSubcategory(this.categoryName, this.subCategoryName, {postId:forumObj.postId}).subscribe(()=> {
        console.log(this.subCategoryName + " | " + forumObj.postId);
        alert("Posted!");
        //window.location.reload();
      },
      error=> {
        console.log(error);
        alert("There was an error adding the post id to the forums collection.");
      });
    },
    error=> {
      console.log(error);
      alert("There was an error creating the post to the database.");
    });
  }

}
