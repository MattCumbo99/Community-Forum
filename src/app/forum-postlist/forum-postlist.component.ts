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
  subCategoryTitle:string = "";
  subCategoryPosts:Array<ForumPost> = [];

  constructor(public globals:GlobalVariables, private router:Router, private titleService:Title, 
    private forumService:ForumsService, private forumPostService:ForumpostService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const catTitle = this.router.url.split('/').pop();
    if (catTitle != undefined) {
      // When the category has spaces, parse the url codes
      this.subCategoryTitle = catTitle.split("%20").join(" ");

      // Search the database for the category
      this.forumService.getCategoryBySubcategory(this.subCategoryTitle).subscribe(data=> {
        if (!data) {
          this.router.navigateByUrl("/error");
          return;
        }

        // Get the index of the subcategory by its name
        const pos = data.subCategories.map(function(e) { return e.name; }).indexOf(this.subCategoryTitle);

        // Push each forum post corresponding to the ids in the array
        // and into the usable variable
        data.subCategories[pos].posts.forEach(element=> {
          this.forumPostService.getPost(element).subscribe(postData=> {
            this.subCategoryPosts.push(postData);
          });
        });
      },
      error=> {
        this.router.navigateByUrl("/error");
      });

    }

    // TODO: verify the sub-category name exists

    this.titleService.setTitle(this.globals.websiteTitle + " - " + this.subCategoryTitle);
  }

}
