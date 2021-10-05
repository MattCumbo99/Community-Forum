import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';
import { UserService } from '../backend/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forum-login',
  templateUrl: './forum-login.component.html',
  styleUrls: ['./forum-login.component.css']
})
export class ForumLoginComponent implements OnInit {

  errorText:string = "";
  showError:boolean = false;

  constructor(private titleService:Title, private userService:UserService, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Log in");
  }

  // Shows an error on the screen. If nothing is input, the error hides
  displayError(text?:string): void {
    if (text != null) {
      this.errorText = text;
      this.showError = true;
    }
    else {
      this.errorText = "";
      this.showError = false;
    }
  }

  checkUser(loginRef:NgForm): void {
    let loginForm = loginRef.value;

    
  }

}
