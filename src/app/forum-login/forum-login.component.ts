import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';
import { UserService } from '../backend/services/user.service';
import { BanService } from '../backend/services/ban.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-login',
  templateUrl: './forum-login.component.html',
  styleUrls: ['./forum-login.component.css']
})
export class ForumLoginComponent implements OnInit {

  // Error properties
  errorText:string = "";
  showError:boolean = false;

  constructor(private titleService:Title, private banService:BanService, private userService:UserService, 
    private router:Router, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Log in");
    // When the user is already logged in, redirect
    if (window.localStorage.getItem('forum_login') || window.sessionStorage.getItem('forum_login')) {
      this.router.navigateByUrl("");
    }
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
        // Check if the user is banned
        this.banService.getUsersBan(loginForm.username).subscribe(banInfo=> {
          if (!banInfo) {
            // User is able to login
            this.displayError();
            if (loginForm.stayLogged) {
              window.localStorage.setItem('forum_login', data.username);
            }
            else {
              window.sessionStorage.setItem('forum_login', data.username);
            }
            location.reload();
            return;
          }

          const curTime = new Date();
          // Parse the date from mongodb into a js Date
          const banDate = new Date(Date.parse(banInfo.expiryDate.toString()));

          // Check if the ban is still active
          if (banDate.getTime() > curTime.getTime() && banInfo.unbanned==false) {
            this.displayError("Your account has been banned. Visit the 'Bans' tab for more information.");
            loginRef.reset();
          }
          // Expired ban
          else {
            // User is able to login
            this.displayError();
            if (loginForm.stayLogged) {
              window.localStorage.setItem('forum_login', data.username);
            }
            else {
              window.sessionStorage.setItem('forum_login', data.username);
            }
            location.reload();
          }
        },
        // User has no bans
        error=> {
          // User is able to login
          this.displayError();
          
          if (loginForm.stayLogged) {
            window.localStorage.setItem('forum_login', data.username);
          }
          else {
            window.sessionStorage.setItem('forum_login', data.username);
          }
          location.reload();
        });
      }
      // User doesn't exist
      else {
        this.displayError("Invalid credentials.");
        console.log(data);
      }
    },
    error=> {
      this.userService.getUser(loginForm.username).subscribe(data=> {
        this.displayError("Invalid credentials.");
      },
      error=> {
        this.displayError("User "+loginForm.username+" not found.");
      });
      
    });
  }

}
