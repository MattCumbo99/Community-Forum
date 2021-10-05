import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-login',
  templateUrl: './forum-login.component.html',
  styleUrls: ['./forum-login.component.css']
})
export class ForumLoginComponent implements OnInit {

  constructor(private titleService:Title, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Log in");
  }

}
