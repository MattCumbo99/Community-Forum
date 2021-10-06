import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';
import { UserService } from '../backend/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../backend/interfaces/user.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forum-login',
  templateUrl: './forum-login.component.html',
  styleUrls: ['./forum-login.component.css']
})
export class ForumLoginComponent implements OnInit {

  // Error properties
  errorText:string = "";
  showError:boolean = false;

  subscription:Subscription = new Subscription;

  constructor(private titleService:Title, private userService:UserService, 
    private router:Router, private loginService:LoginService, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Log in");
    // When the user is already logged in, redirect
    this.subscription = this.loginService.currentUser.subscribe(user=> {
      if (user != this.globals.defaultUser) {
        this.router.navigateByUrl("");
      }
    });
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

  // Function called when the user attempts to login
  checkUser(loginRef:NgForm): void {
    let loginForm = loginRef.value;

    this.userService.getUserFromLogin(loginForm.username, loginForm.password).subscribe(data=> {
      if (data) {
        // User is able to login
        this.displayError();
        this.loginService.changeUser(data);
        this.router.navigateByUrl("");
      }
      else {
        this.displayError("Invalid credentials.");
        console.log(data);
      }
    },
    error=> {
      this.displayError("User "+loginForm.username+" not found.");
    });
  }

}
