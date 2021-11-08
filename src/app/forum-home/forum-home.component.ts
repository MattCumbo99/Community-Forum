import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';
import { ForumsService } from '../backend/services/forums.service';
import { ForumCategory } from '../backend/interfaces/forumcategory.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { User } from '../backend/interfaces/user.interface';
import { UserService } from '../backend/services/user.service';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {

  // Details of the logged in user will go here
  currentUser:User = this.globals.defaultUser;

  categories:Array<ForumCategory> = [];

  constructor(private titleService:Title, private userService:UserService, private dialog:MatDialog,
    private forumsService:ForumsService, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle);

    // Initialize the categories
    this.forumsService.getAllCategories().subscribe(data=> {
      this.categories = data;
    });
    // Initialize the current user
    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.currentUser = data;
    });
  }

  // Opens a dialog to create a new category with
  openDialogCategory(): void {
    const dialogRef = this.dialog.open(DialogCreateCategory, {
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Open a dialog to create a new sub-category with
  openDialogSubcategory(categoryName:string): void {
    const dialogRef = this.dialog.open(DialogCreateSubcategory, {
      width: '500px',
      height: '400px',
      data: categoryName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-category',
  templateUrl: './dialogs/dialog-createcategory.html'
})
export class DialogCreateCategory {

  constructor(private forumService:ForumsService, public dialogRef:MatDialogRef<DialogCreateCategory>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Form submission function
  addCategory(catRef:NgForm): void {
    let catForm = catRef.value;

    this.forumService.createCategory({name:catForm.catname, description:catForm.catdesc}).subscribe(()=> {
      alert("Category created!");
      window.location.reload();
    });
  }
}

@Component({
  selector: 'dialog-subcategory',
  templateUrl: './dialogs/dialog-createsubcategory.html'
})
export class DialogCreateSubcategory {

  constructor(private forumService:ForumsService, 
    public dialogRef:MatDialogRef<DialogCreateSubcategory>, @Inject(MAT_DIALOG_DATA) public data:string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Form submission function
  addSubcategory(subRef:NgForm): void {
    let subForm = subRef.value;

    this.forumService.addSubcategory(this.data, {name:subForm.subname, description:subForm.subdesc}).subscribe(()=> {
      alert("Sub-category created!");
      window.location.reload();
    });
  }
}

@Component({
  selector: 'dialog-subject',
  templateUrl: './dialogs/dialog-createsubject.html'
})
export class DialogCreateSubject {

  constructor(public dialogRef:MatDialogRef<DialogCreateSubject>, @Inject(MAT_DIALOG_DATA) public data:string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}