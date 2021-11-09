import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../common/global-variables';
import { Title } from '@angular/platform-browser';
import { ForumsService } from '../backend/services/forums.service';

@Component({
  selector: 'app-forum-postlist',
  templateUrl: './forum-postlist.component.html',
  styleUrls: ['./forum-postlist.component.css']
})
export class ForumPostlistComponent implements OnInit {

  constructor(public globals:GlobalVariables, private titleService:Title, private forumService:ForumsService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle + " - List");
  }

}
