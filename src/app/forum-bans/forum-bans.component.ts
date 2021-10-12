import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalVariables } from '../common/global-variables';
import { Ban } from '../backend/interfaces/ban.interface';
import { BanService } from '../backend/services/ban.service';

@Component({
  selector: 'app-forum-bans',
  templateUrl: './forum-bans.component.html',
  styleUrls: ['./forum-bans.component.css']
})
export class ForumBansComponent implements OnInit {

  bans:Array<Ban> = [];

  constructor(private titleService:Title, private banService:BanService, public globals:GlobalVariables) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.globals.websiteTitle+" - Bans");

    // Load the list of bans
    this.banService.getAllBans().subscribe(data=> {
      data.forEach(element=> {
        this.bans.push(element);
      });
    });
  }

  // Returns true if the ban is still active
  isActive(expiration:string): boolean {
    const curTime = new Date();
    const banTime = new Date(Date.parse(expiration));

    return curTime < banTime;
  }

}
