import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { UserService } from '../backend/services/user.service';
import { BanService } from '../backend/services/ban.service';

// Interfaces
import { User } from '../backend/interfaces/user.interface';
import { GlobalVariables } from '../common/global-variables';
import { ForumMessage } from '../backend/interfaces/forummessage.interface';
import { ForumComment } from '../backend/interfaces/forumcomment.interface';

@Component({
  selector: 'app-forum-profile',
  templateUrl: './forum-profile.component.html',
  styleUrls: ['./forum-profile.component.css']
})
export class ForumProfileComponent implements OnInit {

  // Details of the user's profile goes here
  userProfile:User = this.globals.defaultUser;
  isBanned:boolean = false;
  profileComments:Array<{user:User, content:string, postDate:Date}> = [];
  // Logged in user
  loggedInUser:User = this.globals.defaultUser;

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
          if (banData && !banData.unbanned) {
            const curTime = new Date();
            const banTime = new Date(Date.parse(banData.expiryDate.toString()));

            if (banTime.getTime() > curTime.getTime()) {
              this.isBanned = true;
            }
          }
        });

        // Load profile comments
        if (data.profileComments) {
          data.profileComments.forEach(element=> {
            // We dynamically get the user details for each comment
            this.userService.getUser(element.username).subscribe(userData=> {
              const commentObj = {user:userData, content:element.content, postDate:element.datePosted};
              this.profileComments.unshift(commentObj);
            });
          });
        }
      }
      else { // Error
        this.titleService.setTitle(this.globals.websiteTitle+" - Error");
      }
    });
    
    // Logged in user data (mostly for privileges)
    if (this.globals.getCurrentUserDetails() !== "") {
      this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
        this.loggedInUser = data;
      });
    }
  }

  // Adds a comment to the user's page
  addComment(commentRef:NgForm): void {
    let commentForm = commentRef.value;
    // Create the comment
    const newComment:ForumComment = {content:commentForm.comment, username:this.loggedInUser.username, datePosted:new Date()};

    // Prepare to add the comment to the database
    if (this.userProfile.profileComments) {
      this.userProfile.profileComments.push(newComment);
      // If this isn't their own profile, send a notification
      if (this.userProfile.messages && this.userProfile.username!=this.loggedInUser.username) {
        const newMessage:ForumMessage = {
          subject:this.loggedInUser.username+" added a comment to your profile", 
          linkUrl:"/members/"+this.userProfile.username, 
          isRead:false, 
          dateSent:new Date()
        };

        this.userProfile.messages.push(newMessage);
      }
    }

    // Save the comment to the user's database object
    this.userService.updateUserDetails(this.userProfile.username, this.userProfile).subscribe(()=> {
      window.location.reload();
    });
  }

  // Returns the profiled user's age
  getUserAge(): number {
    const today = new Date();
    const birthDate = new Date(Date.parse(this.userProfile.birthday.toString()));
    const m = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  // Report user button function
  reportUser(): void {
    const dialogRef = this.dialog.open(DialogReport, {
      width: '250px',
      data:this.userProfile.username
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

  // Unban user function
  unbanUser(): void {
    const dialogRef = this.dialog.open(DialogUnban, {
      width: '750px',
      height: '350px',
      data:this.userProfile.username
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-unban',
  templateUrl: './dialogs/dialog-unban.html'
})
export class DialogUnban {

  errorText:string = "";

  constructor(private banService:BanService, public globals:GlobalVariables, public dialogRef:MatDialogRef<DialogUnban>, 
    @Inject(MAT_DIALOG_DATA) public data:string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  unbanUser(unbanRef:NgForm): void {
    let unbanForm = unbanRef.value;

    if (unbanForm.reason === "") {
      this.displayError("Unban reason required.");
    }
    // Unban the user
    else {
      this.banService.getUsersBan(this.data).subscribe(banData=> {
        let newBan = banData;
        newBan.unbanned = true;
        newBan.unbanReason = unbanForm.reason;
        newBan.unbanAuthor = this.globals.getCurrentUserDetails();

        this.banService.updateBanByUser(this.data, newBan).subscribe(()=> {
          alert("User unbanned!");
          window.location.reload();
        });
      });
    }
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

@Component({
  selector: 'dialog-report',
  templateUrl: './dialogs/dialog-report.html'
})
export class DialogReport {

  constructor(public dialogRef:MatDialogRef<DialogReport>, 
    @Inject(MAT_DIALOG_DATA) public data:string) { }
}

@Component({
  selector: 'dialog-promote',
  templateUrl: './dialogs/dialog-promote.html'
})
export class DialogPromote {

  constructor(private userService:UserService, public dialogRef:MatDialogRef<DialogPromote>, 
    @Inject(MAT_DIALOG_DATA) public data:string, public globals:GlobalVariables) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  promoteUser(): void {
    // Update the database
    this.userService.getUser(this.data).subscribe(data=> {
      let newUser = data;
      newUser.privilege = 253; // Moderator role id

      this.userService.updateUserDetails(this.data, newUser).subscribe(res=> {
        alert("User updated successfully.");

        // Message to give the user
        const promoMessage:ForumMessage = {
          subject:"Your role has been changed to: Moderator",
          linkUrl:"/members/"+this.data,
          isRead:false,
          dateSent:new Date()
        }

        this.userService.sendNotification(this.data, promoMessage).subscribe(res2=> {

        });
        window.location.reload();
      },
      error=> {
        alert("There was an error updating the user");
        console.log(error);
      });
    });
  }
}

@Component({
  selector: 'dialog-rolechange',
  templateUrl: './dialogs/dialog-rolechange.html'
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
        // Message to give the user
        const promoMessage:ForumMessage = {
          subject:"Your role has been changed to: "+this.globals.getRoleName(roleForm.role),
          linkUrl:"/members/"+this.data.username,
          isRead:false,
          dateSent:new Date()
        }

        this.userService.sendNotification(this.data.username, promoMessage).subscribe(res2=> {

        });

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
  templateUrl: './dialogs/dialog-ban.html'
})
export class DialogBan {

  errorText:string = "";
  permaSelected:boolean = false;
  maxBanLength:number = 23;
  currentBanLength:number = 1;

  constructor(private banService:BanService, public globals:GlobalVariables, public dialogRef:MatDialogRef<DialogBan>,
    @Inject(MAT_DIALOG_DATA) public data:string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Max amount allowed for each option
  changeBanLength(event:any): void {
    switch (event.target.value) {
      case 'hours':
        this.maxBanLength = 23;
        break;
      case 'days':
        this.maxBanLength = 6;
        break;
      case 'weeks':
        this.maxBanLength = 4;
        break;
    }
    this.currentBanLength = 1;
    
  }

  // Submit function
  submitBan(banRef:NgForm): void {
    let banForm = banRef.value;
    
    if (banForm.reason === "") {
      this.displayError("Ban reason required.");
    }
    else if (this.permaSelected==false && (banForm.banlength1 <= 0 || 
      (banForm.banlength2==="hours" && banForm.banlength1 > 23) ||
      (banForm.banlength2==="days" && banForm.banlength1 > 6) || 
      (banForm.banlength2==="weeks" && banForm.banlength1 > 4))) {
      this.displayError("Invalid ban length");
    }
    // Form success
    else {
      this.displayError();

      const numValue = banForm.banlength1;
      console.log("Number detected: "+numValue);
      let unbanText = "";
      let expireDate = new Date();

      // Calculate the unban date
      if (this.permaSelected == false) {
        switch (banForm.banlength2) {
          case 'hours':
            expireDate.setHours(expireDate.getHours() + numValue);
            unbanText += "hour";
            break;
          case 'days':
            expireDate.setDate(expireDate.getDate() + numValue * 1);
            unbanText += "day";
            break;
          case 'weeks':
            expireDate.setDate(expireDate.getDate() + numValue * 7);
            unbanText += "week";
            break;
          default:
            alert("There was an error calculating the date!");
            return;
        }
        unbanText = numValue + " " + unbanText;
        if (numValue!=1) // For plurals
          unbanText += "s";
      }
      else {
        expireDate = this.globals.permaDate;
        unbanText = "Permanent";
      }
      
      const newBan = {username:this.data, reason:banForm.reason, lengthText:unbanText, createdAt:new Date(), updatedAt:new Date(), expiryDate:expireDate, author:this.globals.getCurrentUserDetails()};
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
