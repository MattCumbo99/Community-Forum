import { Component, OnInit } from '@angular/core';
import { UserService } from '../backend/services/user.service';
import { User } from '../backend/interfaces/user.interface';
import { GlobalVariables } from '../common/global-variables';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forum-editprofile',
  templateUrl: './forum-editprofile.component.html',
  styleUrls: ['./forum-editprofile.component.css']
})
export class ForumEditprofileComponent implements OnInit {

  currentUser:User = this.globals.defaultUser;

  constructor(private userService:UserService, private router:Router, private titleService:Title,
    public globals:GlobalVariables) { }

  ngOnInit(): void {
    // When the user is not logged in, redirect
    if (!window.localStorage.getItem('forum_login') && !window.sessionStorage.getItem('forum_login')) {
      this.router.navigateByUrl("/login");
      return;
    }

    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.currentUser = data;
      this.titleService.setTitle("Edit Profile: " + this.currentUser.username);
    });
  }

  // Edit profile submit function
  editProfile(profileRef:NgForm): void {
    let profileForm = profileRef.value;
    let newUser:User = this.currentUser;

    if (profileForm.pfpUrl !== "") {
      newUser.pfpUrl = profileForm.pfpUrl;
    }
    newUser.signature = profileForm.signature;
    newUser.location = profileForm.location;
    
    this.userService.updateUserDetails(newUser.username, newUser).subscribe(res=> {
      alert("Profile updated successfully.");
      window.location.reload();
    });
  }

  // Change password function
  changePassword(passRef:NgForm): void {
    let passForm = passRef.value;


  }

}
