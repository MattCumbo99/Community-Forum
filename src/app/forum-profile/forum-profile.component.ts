import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../backend/interfaces/user.interface';
import { UserService } from '../backend/services/user.service';
import { BanService } from '../backend/services/ban.service';
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
  isBanned:boolean = false;

  constructor(private titleService:Title, private banService:BanService, private route:ActivatedRoute, private userService:UserService,
    private router:Router, public globals:GlobalVariables, public dialog:MatDialog) { }

  ngOnInit(): void {
    const uname = this.route.snapshot.params["user"];

    // Check if the profile exists
    this.userService.getUser(uname).subscribe(data=> {
      if (data) { // User exists
        this.userProfile = data;
        this.titleService.setTitle(uname+" - "+this.globals.websiteTitle);

        // Determine if the user is banned
        this.banService.getUsersBan(data.username).subscribe(banData=> {
          const curTime = new Date();
          const banTime = new Date(banData.expiryDate);

          if (banTime.getTime() > curTime.getTime()) {
            this.isBanned = true;
          }
        });
      }
      else { // Error
        this.titleService.setTitle(this.globals.websiteTitle+" - Error");
      }
    });
    
    // Logged in user data (mostly for privileges)
    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.loggedInUser = data;
    });
    console.log("Current username: " + this.loggedInUser.username);
  }

  // Promotion button function
  promoteUser(): void {
    const dialogRef = this.dialog.open(DialogPromote, {
      width: '250px',
      data:this.userProfile.username
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Change user role button function
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

  // Ban user function
  banUser(): void {
    const dialogRef = this.dialog.open(DialogBan, {
      width: '750px',
      height: '500px',
      data:this.userProfile.username
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

@Component({
  selector: 'dialog-ban',
  templateUrl: 'dialog-ban.html'
})
export class DialogBan {

  errorText:string = "";
  permaSelected:boolean = false;

  constructor(private banService:BanService, public globals:GlobalVariables, public dialogRef:MatDialogRef<DialogBan>,
    @Inject(MAT_DIALOG_DATA) public data:string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Submit function
  submitBan(banRef:NgForm): void {
    let banForm = banRef.value;
    
    if (banForm.reason === "") {
      this.displayError("Ban reason required.");
    }
    else if (this.permaSelected==false && (banForm.banlength1 <= 0 || banForm.banlength2 === "")) {
      this.displayError("Invalid ban length.");
    }
    // Form success
    else {
      this.displayError();

      const numValue = banForm.banlength1;
      let unbanText = "";
      let expireDate = new Date();

      // Calculate the unban date
      if (this.permaSelected == false) {
        switch (banForm.banlength2) {
          case 'hours':
            expireDate.setHours(expireDate.getHours() + numValue);
            break;
          case 'days':
            expireDate.setDate(expireDate.getDate() + numValue);
            break;
          case 'weeks':
            expireDate.setDate(expireDate.getDate() + numValue * 7);
            break;
          default:
            alert("There was an error calculating the date!");
            return;
        }
        unbanText = banForm.banlength1 + " " + banForm.banlength2;
      }
      else {
        expireDate = this.globals.permaDate;
        unbanText = "Permanent";
      }
      
      const newBan = {username:this.data, reason:banForm.reason, lengthText:unbanText, expiryDate:expireDate, author:this.globals.getCurrentUserDetails()};
      // Call service to add the ban to the database
      this.banService.addBan(newBan).subscribe(res=> {
        alert("User banned.");
        window.location.reload();
      },
      err=> {
        alert("There was an error banning the user.");
        console.log(err);
      });
    }
  }

  // Show/hide input based on permanent selection
  permaChanged(event:any): void {
    this.permaSelected = event.target.checked;
  }

  // Shows an error on the screen. If nothing is input, the error hides
  displayError(text?:string): void {
    if (text != null) {
      this.errorText = text;
    }
    else {
      this.errorText = "";
    }
  }
}
