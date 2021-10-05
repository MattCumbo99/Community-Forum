import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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

  constructor(private titleService:Title, private userService:UserService, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Register");
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
    else if (registerForm.password === "") {
      this.displayError("Password required.");
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
        // User exists
        if (!data) {
          // Make a new object to save the user as
          const newUser = {username:registerForm.username, password:registerForm.password, 
            email:registerForm.email, birthday:registerForm.dob};

            // Attempt to save the user
            this.userService.registerUser(newUser).subscribe(response=> {
              this.displayError();
              alert("Registration successful");
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
