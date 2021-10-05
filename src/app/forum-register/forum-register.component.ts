import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-register',
  templateUrl: './forum-register.component.html',
  styleUrls: ['./forum-register.component.css']
})
export class ForumRegisterComponent implements OnInit {

  constructor(private titleService:Title, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Register");
  }

}
