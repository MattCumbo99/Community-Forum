import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../common/global-variables';
import { Title } from '@angular/platform-browser';
import { ForumsService } from '../backend/services/forums.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from '../backend/interfaces/forumpost.interface';

@Component({
  selector: 'app-forum-postlist',
  templateUrl: './forum-postlist.component.html',
  styleUrls: ['./forum-postlist.component.css']
})
export class ForumPostlistComponent implements OnInit {

  // Name of the sub-category
  subCategoryTitle:string = "";
  subCategoryPosts:Array<ForumPost> = [];

  constructor(public globals:GlobalVariables, private router:Router, private titleService:Title, 
    private forumService:ForumsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const catTitle = this.router.url.split('/').pop();
    if (catTitle != undefined) {
      // When the category has spaces, parse the url codes
      this.subCategoryTitle = catTitle.split("%20").join(" ");

      // Search the database for the category
      this.forumService.getAllCategories().subscribe(catData=> {
        // Go through each category, looking at the names of each 
        // of its sub-categories until it finds a match
        let postIDs = Array<string>();
        catData.forEach(element=> {
          element.subCategories.forEach(postElement=> {
            if (postElement.name === this.subCategoryTitle) {
              postIDs = postElement.posts;
            }
          })
        });
      });

    }

    // TODO: verify the sub-category name exists

    this.titleService.setTitle(this.globals.websiteTitle + " - " + this.subCategoryTitle);
  }

}
