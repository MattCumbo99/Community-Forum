import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ForumReport } from '../backend/interfaces/forumreport.interface';
import { User } from '../backend/interfaces/user.interface';
import { UserService } from '../backend/services/user.service';
import { AdminlogService } from '../backend/services/adminlog.service';
import { ReportService } from '../backend/services/report.service';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-forum-adminpanel',
  templateUrl: './forum-adminpanel.component.html',
  styleUrls: ['./forum-adminpanel.component.css']
})
export class ForumAdminpanelComponent implements OnInit {

  currentUser:User = this.globals.defaultUser;
  reports:Array<ForumReport> = [];

  constructor(private titleService:Title, private userService:UserService, private adminlogService:AdminlogService,
    private reportService:ReportService, public router:Router, public globals:GlobalVariables) { }

  ngOnInit(): void {
    // When the user is not logged in, redirect
    if (!window.localStorage.getItem('forum_login') && !window.sessionStorage.getItem('forum_login')) {
      this.router.navigateByUrl("/error");
      return;
    }

    // Check the profile of the currently logged in user
    this.userService.getUser(this.globals.getCurrentUserDetails()).subscribe(data=> {
      this.currentUser = data;

      if (data.privilege < 253) {
        this.router.navigateByUrl("/error");
      }
      // Correct user can access it
      else {
        this.titleService.setTitle(this.globals.websiteTitle+" - Admin Panel");

        this.reportService.getAll().subscribe(data=> {
          this.reports = data;
        });
      }
    });
  }

  // Gets the status associated with the number of a report
  displayStatus(num:number): string {
    switch(num) {
      case 0:
        return "Pending";
      case 1:
        return "Denied";
      case 2:
        return "Approved";
      default:
        return "Unknown status";
    }
  }

  // Approve function
  approveReport(id:number): void {
    this.reportService.updateReportStatus(id, 2).subscribe(res=> {
      alert("Report approved!");
    },
    error=> {
      alert("Error: Could not update report id " + id + "!");
    });
  }

  // Deny function
  denyReport(id:number): void {
    this.reportService.updateReportStatus(id, 1);
  }
}
