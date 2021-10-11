import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../backend/interfaces/user.interface';
import { UserService } from '../backend/services/user.service';
import { GlobalVariables } from '../common/global-variables';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forum-profile',
  templateUrl: './forum-profile.component.html',
  styleUrls: ['./forum-profile.component.css']
})
export class ForumProfileComponent implements OnInit {

  // Details of the user's profile goes here
  userProfile:User = this.globals.defaultUser;
  // Logged in user
  loggedInUser:User = this.globals.defaultUser;

  constructor(private titleService:Title, private route:ActivatedRoute, private userService:UserService,
    private router:Router, public globals:GlobalVariables, public dialog:MatDialog) { }

  ngOnInit(): void {
    const uname = this.route.snapshot.params["user"];

    // Check if the profile exists
    this.userService.getUser(uname).subscribe(data=> {
      if (data) { // User exists
        this.userProfile = data;
        this.titleService.setTitle(uname+" - "+this.globals.websiteTitle);
      }
      else { // Error
        this.titleService.setTitle(this.globals.websiteTitle+" - Error");
      }
    });
    
    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.loggedInUser = data;
    });
    console.log("Current username: " + this.loggedInUser.username);
  }

  // Promotion function
  promoteUser(): void {
    const dialogRef = this.dialog.open(DialogPromote, {
      width: '250px',
      data:this.userProfile.username
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeUserRole(): void {
    const dialogRef = this.dialog.open(DialogRoleChange, {
      width: '750px',
      height: '500px',
      data:{username:this.userProfile.username, profilePrivilege:this.userProfile.privilege, loggedPrivilege:this.loggedInUser.privilege}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-promote',
  templateUrl: 'dialog-promote.html'
})
export class DialogPromote {

  constructor(public dialogRef:MatDialogRef<DialogPromote>, 
    @Inject(MAT_DIALOG_DATA) public data:string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-rolechange',
  templateUrl: 'dialog-rolechange.html'
})
export class DialogRoleChange {

  constructor(private userService:UserService, public dialogRef:MatDialogRef<DialogRoleChange>, 
    @Inject(MAT_DIALOG_DATA) public data:{username:string, profilePrivilege:number, loggedPrivilege:number}, public globals:GlobalVariables) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setRole(roleRef:NgForm): void {
    let roleForm = roleRef.value;

    // Update the database
    this.userService.getUser(this.data.username).subscribe(data=> {
      let newUser = data;
      newUser.privilege = roleForm.role;

      this.userService.updateUserDetails(this.data.username, newUser).subscribe(res=> {
        alert("User updated successfully.");
        window.location.reload();
      },
      error=> {
        alert("There was an error updating the user");
        console.log(error);
      })
    })
  }

}
