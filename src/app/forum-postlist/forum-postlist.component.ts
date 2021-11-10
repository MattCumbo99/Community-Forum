import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../common/global-variables';
import { Title } from '@angular/platform-browser';
import { ForumsService } from '../backend/services/forums.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from '../backend/interfaces/forumpost.interface';
import { ForumpostService } from '../backend/services/forumpost.service';

@Component({
  selector: 'app-forum-postlist',
  templateUrl: './forum-postlist.component.html',
  styleUrls: ['./forum-postlist.component.css']
})
export class ForumPostlistComponent implements OnInit {

  // Name of the sub-category
  subCategoryName:string = "";
  // Name of the category containing the sub-category
  categoryName:string = "";
  // Content of the sub-category's posts
  subCategoryPosts:Array<ForumPost> = [];

  constructor(public globals:GlobalVariables, private router:Router, private titleService:Title, 
    private forumService:ForumsService, private forumPostService:ForumpostService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // Convert the url into a string that which we can identify the subcategory name
    let subvars = this.router.url.split("/");
    subvars.splice(0, 2);
    let subname = subvars.join();

    // When the subcategory contains spaces, modify it from the url
    if (subname.includes("%20")) {
      subname = subname.split("%20").join();
      subname = subname.replace(/,/g, ' ');
    }

    this.subCategoryName = subname;

    // Search the database for the category
    this.forumService.getCategoryBySubcategory(this.subCategoryName).subscribe(data=> {
      if (!data) {
        this.router.navigateByUrl("/error");
        return;
      }
      this.categoryName = data.name;

      // Get the index of the subcategory by its name
      const pos = data.subCategories.map(function(e) { return e.name; }).indexOf(this.subCategoryName);

      // Push each forum post corresponding to the ids in the array
      // and into the usable variable
      data.subCategories[pos].posts.forEach(element=> {
        this.forumPostService.getPost(element).subscribe(postData=> {
          this.subCategoryPosts.unshift(postData);
        });
      });
    },
    error=> {
      console.log(error);
      this.router.navigateByUrl("/error");
    });

    this.titleService.setTitle(this.globals.websiteTitle + " - " + this.subCategoryName);
  }

}
