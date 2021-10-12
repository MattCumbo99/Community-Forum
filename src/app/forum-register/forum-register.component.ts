import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../backend/services/user.service';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-register',
  templateUrl: './forum-register.component.html',
  styleUrls: ['./forum-register.component.css']
})
export class ForumRegisterComponent implements OnInit {

  errorText:string = "";
  showError:boolean = false;

  constructor(private titleService:Title, private userService:UserService, private router:Router,
    public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Register");

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

  // Function called when the user presses register
  sendInfo(registerRef:NgForm): void {
    let registerForm = registerRef.value;

    // First validate the form
    if (registerForm.email === "") {
      this.displayError("Email required.");
    }
    else if (registerForm.dob === "") {
      this.displayError("Date of Birth required.");
    }
    else if (registerForm.username === "") {
      this.displayError("Username required.");
    }
    else if (registerForm.username.length < 3) {
      this.displayError("Username must be at least length 3.")
    }
    else if (registerForm.password === "") {
      this.displayError("Password required.");
    }
    else if (registerForm.password.length < 8 || registerForm.password.length > 20) {
      this.displayError("Password must contain between 8 and 20 characters.");
    }
    else if (registerForm.password != registerForm.repassword) {
      this.displayError("Passwords do not match.");
    }
    else if (!registerForm.agreedToTerms) {
      this.displayError("You must agree to the terms and conditions.");
    }
    else {
      // Test if the username is taken
      this.userService.getUser(registerForm.username).subscribe(data=> {
        // Username is not taken, register
        if (!data) {
          // Make a new object to save the user as
          const newUser = {username:registerForm.username, password:registerForm.password, 
            email:registerForm.email, birthday:registerForm.dob};

            // Attempt to save the user
            this.userService.registerUser(newUser).subscribe(response=> {
              this.displayError();
              alert("You have registered successfully.");
              this.router.navigateByUrl("/login");
            },
            error=> {
              console.log(error);
            });
        }
        else {
          this.displayError("Username already exists.");
        }
      },
      error=> {
        alert("Error!");
      });
    }
  }

}
