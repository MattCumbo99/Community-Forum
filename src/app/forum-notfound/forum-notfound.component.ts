import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-notfound',
  templateUrl: './forum-notfound.component.html',
  styleUrls: ['./forum-notfound.component.css']
})
export class ForumNotfoundComponent implements OnInit {

  constructor(private titleService:Title, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Error");
  }

}
