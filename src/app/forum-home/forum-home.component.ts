import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';
import { ForumsService } from '../backend/services/forums.service';
import { ForumCategory } from '../backend/interfaces/forumcategory.interface';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {

  categories:Array<ForumCategory> = [];

  constructor(private titleService:Title, private forumsService:ForumsService, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle);

    // Initialize the categories
    this.forumsService.getAllCategories().subscribe(data=> {
      this.categories = data;
    });
  }

}
